using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TNOnlinesss.Models
{
    public class TokenApiModel
    {
        //public string usr { get; set; }
        public string AccessToken { get; set; }

        public string refreshToken { get; set; }
        public DateTime refreshTokenExpire { get; set; }
    }
}
