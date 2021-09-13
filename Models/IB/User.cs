using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TNOnlinesss.Models
{
    public class User
    {

        //login
        public string dom { get; set; }
        public int branchID { get; set; }
        public int userID { get; set; }
        public string userName  { get; set; }
        public string userPassword  { get; set; }
        public string userPasswordRep { get; set; }
        public int roleID { get; set; }
        public string uMac  { get; set; }
        public string uAddr { get; set; }
        public string uHostName  { get; set; }
        public string token { get; set; }
        public string responseMessage { get; set; }



        //register
        public string lName { get; set; }
        public string fName { get; set; }
        public string RegNum { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public string cusType { get; set; }
        public string CsTypeName { get; set; }
        

        public int IsDisabled { get; set; }
        public int Regwtype { get; set; }
        public int CreatedBy { get; set; }
        public List<IB.Menus> menus { get; set; }


    }
}
