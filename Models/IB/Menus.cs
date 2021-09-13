using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TNOnlinesss.Models.IB
{
    public class Menus
    {
        public int SMenuID { get; set; }
        public string SMenuName { get; set; }
        public int PSMenuID { get; set; }
        public int SModID { get; set; }
        public string SUsr { get; set; }
        public string SMenuIcon { get; set; }
        public int IsAccept { get; set; }
        public int OrderVal { get; set; }
        public string SModUrl { get; set; }
        public List<Menus> Children { get; set; }
    }
}
