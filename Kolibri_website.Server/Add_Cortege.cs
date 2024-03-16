using LiteDB;
using System.Drawing;
using System.IO;


namespace Kolibri_website.Server
{
    public class Add_Cortege
    {
        public static void NewCortege(Cortege cortege)
        {
            using (var db = new LiteDatabase(@"Prod.db"))
            {

                var col = db.GetCollection<Product_Table>("Products");
                Product_Table Tbl = new Product_Table();
                // var res = col.FindOne(Query.All());
                int i = 1;
                Tbl.Category = cortege.Category;
                Tbl.Name = cortege.Name;
                Tbl.Price = cortege.Price;
                Tbl.ID = i;
                var res = col.FindAll();

                foreach (Product_Table c in res)
                {
                    if (Tbl.ID != c.ID)
                    {
                        break;
                    }
                    i++;

                    Tbl.ID = i;
                }

                MemoryStream memoryStream = new MemoryStream(cortege.Image);

                // Создаем новый Bitmap из MemoryStream
                Bitmap bitmap = new Bitmap(memoryStream);

                // Не забываем закрыть MemoryStream
                memoryStream.Close();
                string imgPath = @$"image\{Tbl.Name}";
                string newDirectoryPath = Path.Combine(Directory.GetCurrentDirectory(), imgPath);
                if (!Directory.Exists(newDirectoryPath))
                {
                    // Создаем новую папку
                    Directory.CreateDirectory(newDirectoryPath);
                    //Console.WriteLine($"Папка создана: {newDirectoryPath}");
                }
                else
                {
                    //Console.WriteLine($"Папка уже существует: {newDirectoryPath}");
                }
                imgPath = Path.Combine(newDirectoryPath, "img.png");
                bitmap.Save(imgPath);
                //Tbl.ID = i;

                col.Insert(Tbl);
            }
        }
        public static void NewQuestion(QuestionCortege question)
        {
            using (var db = new LiteDatabase(@"Question.db"))
            {

                var col = db.GetCollection<QuestionCortege>("Questions");
                QuestionCortege Tbl = new QuestionCortege();
                // var res = col.FindOne(Query.All());
                int i = 1;
                Tbl.Question=question.Question;
                Tbl.Phonumber = question.Phonumber;
                Tbl.Name = question.Name;
                Tbl.ID = i;
                var res = col.FindAll();

                foreach (QuestionCortege c in res)
                {
                    if (Tbl.ID != c.ID)
                    {
                        break;
                    }
                    i++;

                    Tbl.ID = i;
                }

                Tbl.ID = i;
                col.Insert(Tbl);
            }
        }
        public static void NewCustomer(CustomerCortege customer)
        {
            using (var db = new LiteDatabase(@"Customer.db"))
            {

                var col = db.GetCollection<CustomerCortege>("Customers");
                CustomerCortege Tbl = new CustomerCortege();
                // var res = col.FindOne(Query.All());
                int i = 1;
                Tbl.Name = customer.Name;
                Tbl.Phonumber = customer.Phonumber;
                Tbl.ID = i;
                var res = col.FindAll();

                foreach (CustomerCortege c in res)
                {
                    if (Tbl.ID != c.ID)
                    {
                        break;
                    }
                    i++;

                    Tbl.ID = i;
                }

                Tbl.ID = i;
                col.Insert(Tbl);
            }
        }
    }
}
