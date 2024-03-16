using LiteDB;
using System.Data;
using System.IO;
using System.Drawing.Imaging;
using System.Drawing;
namespace Kolibri_website.Server
{
    public class ShowTable
    {
        static byte[] ImgToByte(Image img)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                img.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                return ms.ToArray();
            }
        }

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
                    string imgPath = @$"image\{Tbl[i].Name}\img.png";
                    imgPath = Path.Combine(Directory.GetCurrentDirectory(), imgPath);
                    using (Bitmap bitmap = new Bitmap(imgPath))
                    {
                        Tbl[i].Img = ImgToByte(bitmap);
                    }
                        i++;
                }

                return Tbl;
            }
        }
    }
}
