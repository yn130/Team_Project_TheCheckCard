const { Card } = require('../models');
const { Op } = require('sequelize'); // Sequelize의 Op 객체 가져오기
// exports.getCardDetails = async (req, res) => {
//     try {
//         const query = req.query.query; // 검색어 받기
//         const condition = {};
//         // 검색어에 따라 조건 설정
//         if (query === "교통") {
//             condition.traffic_ox = true;
//             console.log("교통 조건 적용");
//         } else if (query === "편의점") {
//             condition.store_ox = true;
//             console.log("편의점 조건 적용");
//         } else if (query === "카페") {
//             condition.cafe_ox = true;
//             console.log("카페 조건 적용");
//         } else if (query === "구독") {
//             condition.sub_ox = true;
//             console.log("구독 조건 적용");
//         } else if (query === "서적") {
//             condition.book_ox = true;
//             console.log("서적 조건 적용");
//         } else {
//             // 그 외의 검색어는 card_name을 조건으로 설정
//             condition.card_name = {
//                 [Op.like]: `%${query}%`
//             };
//             console.log("기타 검색어 조건 적용");
//         }
//         const cards = await Card.findAll({
//             where: condition,
//             attributes: ['card_id', 'card_name', 'traffic_ox', 'store_ox', 'cafe_ox', 'sub_ox', 'book_ox', 'card_image'] // 필요한 필드만 선택
//         });
//         console.log(`검색된 카드 수: ${cards.length}`);
//         res.render('search', { cards });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// }; 


 
// 한번에 많은 값을 불러오게되면 페이지에 렉이 걸리는 현상이 있음.
// 페이지를 10개씩 나눠서 불러오게 하는 코드. 
// search.ejs 파일에서 주석처리한 부분을 주석만 풀어주고 아래 코드도 같이
// 필요 없을 경우 아래 코드 삭제 후 위 코드 주석풀어주면 됨.
exports.getCardDetails = async (req, res) => {
    try {
        const query = req.query.query; // 검색어 받기
        const page = parseInt(req.query.page, 10) || 1; // 페이지 번호, 기본값 1
        const pageSize = parseInt(req.query.pageSize, 10) || 10; // 페이지당 데이터 수, 기본값 10
        const offset = (page - 1) * pageSize;

        console.log(`Query: ${query}, Page: ${page}, PageSize: ${pageSize}, Offset: ${offset}`);

        const condition = {};
        // 검색어에 따라 조건 설정
        if (query === "교통") {
            condition.traffic_ox = true;
            console.log("교통 조건 적용");
        } else if (query === "편의점") {
            condition.store_ox = true;
            console.log("편의점 조건 적용");
        } else if (query === "카페") {
            condition.cafe_ox = true;
            console.log("카페 조건 적용");
        } else if (query === "구독") {
            condition.sub_ox = true;
            console.log("구독 조건 적용");
        } else if (query === "서적") {
            condition.book_ox = true;
            console.log("서적 조건 적용");
        } else {
            // 그 외의 검색어는 card_name을 조건으로 설정
            condition.card_name = {
                [Op.like]: `%${query}%`
            };
            console.log("기타 검색어 조건 적용");
        }

        console.log('Condition:', condition);

        const { count, rows: cards } = await Card.findAndCountAll({
            where: condition,
            limit: pageSize,
            offset: offset
        });

        console.log(`검색된 카드 수: ${count}`);
        res.render('search', {
            cards,
            query,
            currentPage: page,
            totalPages: Math.ceil(count / pageSize),
            pageSize,
            totalCount: count
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server Error');
    }
};