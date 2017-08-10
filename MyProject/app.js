//加载相应模块 http/express/qs/mysql
const http=require("http");
const express=require("express");
const qs=require("querystring");
const mysql=require("mysql");

//创建连接池 10;
var pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"my_project",
    port:3306,
    connectionLimit:10
});

//创建服务器 并且监听端口 8081
var app=express();
var server=http.createServer(app);
server.listen(8081);

//使用nodejs中间件向客户端直接返回静态内容
app.use(express.static("public"));

//宠物列表分页查询
app.get("/petlist",(req,res)=>{
    //获取参数pageNo 当前页 1 2 3 4;
    var pageNo=req.query.pageNo;
    //console.log(req.query);
    //计算公式查询偏移 LIMIT ?,8
    var offset=(pageNo-1)*8;
    //获取数据库连接
    pool.getConnection((err,conn)=>{
        var sql="SELECT * FROM pet_list LIMIT ?,?";
        conn.query(sql,[offset,8],(err,result)=>{
            if(err)throw err;
            //查询并将结果按json发送
            res.json(result);
            conn.release();
        })
    })
});
//总页数
app.get("/petpage",(req,res)=>{
    //获取数据库连接
    //console.log(res);
    pool.getConnection((err,conn)=>{
        var sql="SELECT count(*) as c FROM pet_list";
        conn.query(sql,(err,result)=>{
            var p=(Math.ceil(result[0].c/8));
            conn.release();
            res.json({page:p});
        })
    })
})