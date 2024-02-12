using LiteDB;

namespace Kolibri_website.Server
{
    public class ShowCategory
    {
        public static Category_Table[] Show()
        {
            using (var db = new LiteDatabase(@"Category.db"))
            {
                var col = db.GetCollection<Category_Table>("Categories");

                var res = col.FindAll();
                int i = 0;
                foreach (Category_Table c in res)
                {
                    i++;
                }
                Category_Table[] Tbl = new Category_Table[i];
                i = 0;
                foreach (Category_Table c in res)
                {
                    Tbl[i] = c;
                    i++;
                }
                return Tbl;
            }
        }
    }
}
