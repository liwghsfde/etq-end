const dbpool=require("../config/dbpoolconfig");
const luoModel={
    Name(params){
        console.log(params);
        return new Promise(((resolve, reject) => {
            dbpool.connect("select g_n_id from goods_name where g_name=?",
                params,
                (err,data)=>{
                    if (data!=""){
                        resolve(false);
                    }else {
                        dbpool.connect("INSERT INTO goods_name VALUES (NULL,?)",
                            params,
                            (err,data)=>{
                                resolve(true)
                            }
                        )
                    }
                }
            )
        }))
    },
    Loading(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT DISTINCT g_n_id AS a,series_ID AS b,section_ID AS c,g_t_id AS d,(SELECT g_name FROM goods_name WHERE g_n_id=a) AS goodsName,(SELECT series_name FROM goods_series WHERE series_ID=b) AS seriesName,(SELECT section_name FROM goods_section WHERE section_ID=c) AS sectionName,(SELECT t_c_texture FROM goods_texturer WHERE g_t_id=d) AS textureName,price,sex,discribe,data FROM goods\n",
                params,
                (err,data)=>{
                    resolve(data);
                }
            )
        })
    },
    Img(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT DISTINCT g_c_ID AS c,(SELECT color_name FROM goods_color WHERE g_c_ID=c) AS colorName FROM goods \n" +
                "WHERE g_n_id=(SELECT g_n_id FROM goods_name WHERE g_name=?)",
                params,
                (err,data)=>{
                    resolve(data)
                }
            )
        })
    },
    CheckImg(params){
        return new Promise(((resolve, reject) => {
            dbpool.connect("SELECT pic_path FROM goods_pic WHERE g_n_id=(SELECT g_n_id FROM goods_name WHERE g_name=?) \n" +
                "AND g_c_id=(SELECT g_c_ID FROM goods_color WHERE color_name=?)",
                params,
                (err,data)=>{
                    resolve(data)
                }
            )

        }))
    },
    Chima(params){
        return new Promise(((resolve, reject) => {
            dbpool.connect("SELECT *,g_z_id AS a,(SELECT size_code FROM goods_size WHERE g_s_id=a) AS size\n" +
                " FROM goods WHERE g_n_id=(SELECT g_n_id FROM goods_name WHERE g_name=?)",
                params,
                (err,data)=>{
                    resolve(data);
                }
            )
        }))
    },
    Add(params){
        return new Promise(((resolve, reject) => {
            dbpool.connect("" +
                "SELECT series_ID FROM goods_series WHERE series_name='"+params[0].xilei+"' UNION ALL \n" +
                "SELECT section_id FROM goods_section WHERE section_name='"+params[0].nannv+"' UNION ALL \n" +
                "SELECT g_n_id FROM goods_name WHERE g_name='"+params[0].name+"' UNION ALL \n" +
                "SELECT g_c_ID FROM goods_color WHERE color_name='"+params[0].color+"' UNION ALL \n" +
                "SELECT g_t_id FROM goods_texturer WHERE t_c_texture='"+params[0].caizhi+"'",
                params,
                (err,data)=>{
                    let Data={'series_id':data[0].series_ID,
                        'section_id':data[1].series_ID,
                        'g_n_id':data[2].series_ID,
                        'g_c_ID':data[3].series_ID,
                        'g_t_id':data[4].series_ID,
                    };
                    resolve(Data);
                })
        }))
    },
    Add2(params){
        return new Promise(((resolve, reject) => {
            dbpool.connect("INSERT INTO goods VALUES " +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','1','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[0]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','2','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[1]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','3','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[2]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','4','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[3]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','5','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[4]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','6','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[5]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','7','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[6]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','8','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[7]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','9','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[8]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','10','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[9]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','11','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[10]+"','"+params.wenzi+"','"+params.data+"')," +
                "(NULL,'"+params.series_id+"','"+params.section_id+"','12','"+params.g_n_id+"','"+params.g_c_ID+"','"+params.g_t_id+"','"+params.price+"',DEFAULT,'"+params.inventory[11]+"','"+params.wenzi+"','"+params.data+"')",
                params,
                (err,data)=>{
                    resolve(data);
                }
            )
        }))
    },
    Delete(params){
        return new Promise(((resolve, reject) => {
            dbpool.connect("DELETE goods,goods_pic FROM goods LEFT JOIN goods_pic ON goods.g_n_id=goods_pic.g_n_id WHERE goods.g_n_id=(SELECT g_n_id FROM goods_name WHERE g_name=?)",
                params,
                (err,data)=>{
                    resolve(data);
                }
            )
        }))
    },
    Upload(params){
        return new Promise(((resolve, reject) => {
            dbpool.connect("INSERT INTO  goods_pic VALUES(NULL,'"+params[0]+"'," +
                "(SELECT g_n_id FROM goods_name WHERE g_name='"+params[1]+"')," +
                "(SELECT g_c_id FROM goods_color WHERE color_name='"+params[2]+"'),'1')",
                params,
                (err,data)=>{
                    resolve(data);
                }
            )
        }))
    },
    Deletes(params){//批量删除
        console.log(params);
        return new Promise(((resolve, reject) => {
            dbpool.connect("DELETE goods,goods_pic FROM goods LEFT JOIN goods_pic ON goods.g_n_id=goods_pic.g_n_id \n" +
                "WHERE goods.g_n_id IN (?)",
                params,
                (err,data)=>{
                    console.log(data);
                })
        }))
    },

    Change(params){//修改数据
        console.log(params[2]);
        return new Promise(((resolve, reject) => {
            dbpool.connect("UPDATE goods SET price='"+params[3]+"' where g_n_id='"+params[0]+"'",
                params,
                (err,data)=>{
                    dbpool.connect("update goods_name set g_name='"+params[1]+"' where g_n_id='"+params[0]+"'",
                        params,
                        (err,data)=>{
                            dbpool.connect("UPDATE goods SET series_ID=(SELECT series_ID FROM goods_series WHERE series_name='"+params[2]+"') WHERE g_n_id='"+params[0]+"'",
                                params,
                                (err,data)=>{
                                    console.log(err);
                                    resolve(data);

                                }
                            )
                        }
                    )

                })

        }))
    }
};
module.exports=luoModel;
