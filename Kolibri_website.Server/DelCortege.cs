using LiteDB;

namespace Kolibri_website.Server
{
    public class DelCortege
    {
        public static void Delete(int ID)
        {
            using (var db = new LiteDatabase(@"Prod.db"))
            {
                var col = db.GetCollection<Product_Table>("Products");
                col.Delete(ID);
            }
        }
    }
}
