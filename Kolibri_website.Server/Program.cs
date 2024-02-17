using Kolibri_website.Server;
using LiteDB;
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
}
);
app.MapPost("/delcortege", (string id) =>
{
    int ID = Convert.ToInt32(id);
    DelCortege.Delete(ID);
}
);
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




app.MapFallbackToFile("/index.html");

app.Run();

