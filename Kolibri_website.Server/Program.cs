using Kolibri_website.Server;
using LiteDB;
using System.Text;
var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapGet("/table", () =>
{
    var Tbl = ShowTable.CallTable();
    return Tbl;
})
.WithName("GetTable")
.WithOpenApi();

app.MapGet("/category", () =>
{
    var Category = ShowCategory.Show();
    return Category;
})
.WithName("GetCategory")
.WithOpenApi();

app.MapPost("/newcortege", (Cortege cort) =>
{
    Add_Cortege.NewCortege(cort);
    return Results.Ok();
}
).Accepts<Cortege>("application/json");

app.MapPost("/delcortege", async (HttpContext context) =>
{
    using (var reader = new StreamReader(context.Request.Body, Encoding.UTF8))
    {
        var id = await reader.ReadToEndAsync();
        int ID = Convert.ToInt32(id);
        // Предполагается, что у вас есть функция Delete, которая принимает ID и удаляет соответствующий элемент
        // Например:
        DelCortege.Delete(ID);
    }
    return Results.Ok();
});


app.MapPost("/addcategory", (string categ) =>
{
    Category.Add(categ);
}
);
app.MapPost("/delcategory", (int id) =>
{
    Category.Delete(id);
}
);
app.MapPost("/addquestion", (QuestionCortege question) =>
{
    SendingMail.Send(question);
}
);
app.MapPost("/addcustomer", (CustomerCortege customer) =>
{
    Add_Cortege.NewCustomer(customer);
}
);



app.MapFallbackToFile("/index.html");

app.Run();

