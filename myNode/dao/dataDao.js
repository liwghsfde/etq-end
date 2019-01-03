/*获取配置文件*/
const dbpool = require("../config/dbpoolconfig");
const dataDao = {

	queryYearTotal:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT YEAR(shiJian) AS YEAR,SUM(danJia*shu) AS yearTotal FROM dindan where os_id=4 GROUP BY YEAR(shiJian)", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryMonthTotal:function (params) {
        var sql;
        sql=params[0]+"-%-%";
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT MONTH(shiJian) AS MONTH,SUM(danJia*shu) AS monthTotal FROM dindan WHERE shiJian LIKE ? AND os_id=4 GROUP BY MONTH(shiJian)",sql,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryQuarterTotal:function (params) {
        var sql;
        sql=params[0]+"-%-%";
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT QUARTER(shiJian) AS season,SUM(danJia*shu) AS seasonTotal FROM dindan WHERE shiJian LIKE ? AND os_id=4 GROUP BY QUARTER(shiJian)",sql,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryYearData:function (params) {
        return new Promise(function (resolve, reject) {
            var sql = params[0]+"-%-%";
            /*console.log(sql);*/
            dbpool.connect("select shu,danJia from dindan where os_id=4 and shiJian like ?", sql,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryUserTotal:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS userTotal FROM USER",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryOrderUserTotal:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS userorderTotal FROM (SELECT DISTINCT user_id FROM dindan) AS n",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryNormalVip:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS vipMount FROM (SELECT user_id,SUM(shu*danJia) AS t FROM dindan GROUP BY user_id HAVING t<1000) AS n;",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    querySilverVip:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS vipMount FROM (SELECT user_id,SUM(shu*danJia) AS t FROM dindan GROUP BY user_id HAVING t>=1000 AND t<5000) AS n;",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryGoldVip:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS vipMount FROM (SELECT user_id,SUM(shu*danJia) AS t FROM dindan GROUP BY user_id HAVING t>=5000 AND t<20000) AS n;",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryMasonryVip:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS vipMount FROM (SELECT user_id,SUM(shu*danJia) AS t FROM dindan GROUP BY user_id HAVING t>=20000) AS n;",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
};
module.exports=dataDao;
