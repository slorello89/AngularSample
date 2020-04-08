using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OpenTokSDK;

namespace OpentokAngular.Controllers
{
    public class SessionController : Controller
    {

        private IConfiguration _Configuration;

        public SessionController(IConfiguration config)
        {
            _Configuration = config;
        }

        public class RoomForm
        {
            public string RoomName { get; set; }
        }

        [HttpPost]
        public IActionResult GetSession([FromBody]RoomForm roomForm)
        {
            var roomName = roomForm.RoomName;
            string sessionId;
            string token;
            using(var db = new OpentokContext())
            {
                var room = db.Rooms.Where(r => r.RoomName == roomName).FirstOrDefault();
                if (room != null)
                {
                    sessionId = room.SessionId;
                    token = room.Token;
                }
                else
                {
                    var apiKey = int.Parse(_Configuration["ApiKey"]);
                    var apiSecret = _Configuration["ApiSecret"];
                    var opentok = new OpenTok(apiKey, apiSecret);
                    var session = opentok.CreateSession();
                    sessionId = session.Id;
                    token = opentok.GenerateToken(sessionId);
                    var roomInsert = new Room 
                    { 
                        SessionId = sessionId, 
                        Token = token, 
                        RoomName = roomName 
                    };
                    db.Add(roomInsert);
                    db.SaveChanges();
                }
            }

            return Json(new {sessionId=sessionId,token=token, apiKey = _Configuration["ApiKey"] });
            
        }
    }
}