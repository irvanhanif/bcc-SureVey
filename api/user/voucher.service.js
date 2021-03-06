const connection = require('../config');

const tablename = "voucher";

module.exports = {
    allVoucher: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename}`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    detailVoucher: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE id_voucher = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    }
}