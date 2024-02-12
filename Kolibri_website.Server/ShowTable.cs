using LiteDB;
using System.Data;

namespace Kolibri_website.Server
{
    public class ShowTable
    {
        public static Product_Table[] CallTable()
        {
            using (var db = new LiteDatabase(@"Prod.db"))
            {
                var col = db.GetCollection<Product_Table>("Products");
                
                var res = col.FindAll();
                int i = 0;
                foreach (Product_Table c in res)
                {
                    i++;
                }
                Product_Table[] Tbl = new Product_Table[i];
                i = 0;
                foreach (Product_Table c in res)
                {
                    Tbl[i] = c;
                    i++;
                }
                return Tbl;
            }
        }
    }
}
