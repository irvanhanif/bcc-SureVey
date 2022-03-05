const {
    postKuesioner,
    allKuesioner,
    detailKuesioner
} = require('./kuesioner.service');
const { postKriteria } = require('../kriteria/kriteria.service');
const { postDomisili } = require('../domisili/domisili.service');
const { postUsia } = require('../kriteria/usia.sevice');
const { ERROR, SUCCESS } = require('../respon');

module.exports = {
    inputKuesioner: (req, res) => {
        if(req.decoded.user.id_user != req.params.id) return ERROR(res, 409, "user doesn't match with id");
        req.body.id_user = req.params.id;
        postUsia(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
        
            req.body.id_usia = result.insertId;
            postDomisili(req.body, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
    
                req.body.id_domisili = results.insertId;
                postKriteria(req.body, (errors1, results1) => {
                    if(errors1) return ERROR(res, 500, errors1);
    
                    req.body.id_kriteria = results1.insertId;
                    postKuesioner(req.body, (errors2, results2) => {
                        if(errors2) return ERROR(res, 500, errors2);
    
                        return SUCCESS(res, 200, "success submit form");
                    });
                });
            });
        });
    },
    getAllKuesioner: (req, res) => {
        allKuesioner((error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    getKuesioner: (req, res) => {
        detailKuesioner(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        })
    }
}