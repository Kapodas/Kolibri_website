using LiteDB;

namespace Kolibri_website.Server
{
    public class Category
    {
        public static void Add(string Category)
        {
            using (var db = new LiteDatabase(@"Category.db"))
            {

                var col = db.GetCollection<Category_Table>("Categories");
                Category_Table cat = new Category_Table();
                // var res = col.FindOne(Query.All());
                int i = 0;
                cat.ID = i;
                cat.Category = Category;
                var res = col.FindAll();

                foreach (Category_Table c in res)
                {
                    if (cat.ID != c.ID)
                    {
                        break;
                    }
                    i++;

                    cat.ID = i;
                }
                col.Insert(cat);
            }
        }
        public static void Delete(int ID)
        {
            using (var db = new LiteDatabase(@"Category.db"))
            {

                var col = db.GetCollection<Category_Table>("Categories");
                col.Delete(ID);
            }
        }
    }
}
