
const dataDao = require("../dao/dataDao");
const dataController = {
    querySaleData:function (req, res) {
        dataDao.queryYearTotal()
            .then(function (data1) {
                dataDao.queryMonthTotal([req.query.year])
                    .then(function (data2) {
                        dataDao.queryQuarterTotal([req.query.year])
                            .then(function (data3) {
                                dataDao.queryUserTotal()
                                    .then(function (data4) {
                                        dataDao.queryNormalVip()
                                            .then(function (data5) {
                                                dataDao.querySilverVip()
                                                    .then(function (data6) {
                                                        dataDao.queryGoldVip()
                                                            .then(function (data7) {
                                                                dataDao.queryMasonryVip()
                                                                    .then(function (data8) {
                                                                        dataDao.queryOrderUserTotal()
                                                                            .then(function (data9) {
                                                                                var vip=[
                                                                                    {value:parseInt(data5[0].vipMount)+(parseInt((data4[0].userTotal-parseInt((data9[0].userorderTotal))))),name:"普通会员"},
                                                                                    {value:data6[0].vipMount,name:"白银会员"},
                                                                                    {value:data7[0].vipMount,name:"黄金会员"},
                                                                                    {value:data8[0].vipMount,name:"砖石会员"},
                                                                                ];
                                                                                res.send({
                                                                                    yearTotal:data1,
                                                                                    monthTotal:data2,
                                                                                    quarterTotal:data3,
                                                                                    vip:vip
                                                                                })
                                                                            })
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })

                    })
            })
    },
};
module.exports=dataController;