const axios = require('axios');

const BASE_URL = 'http://localhost:8080';

// 테스트용 사용자 데이터
const testUser = {
  email: 'test1@example.com',
  username: 'testuser1',
  password: 'password123',
  interests: ['electronics', 'clothing'],
};

let authToken = '';

async function testAPI() {
  console.log('🚀 투표 기반 쇼핑 추천 시스템 API 테스트 시작\n');

  try {
    // 1. 회원가입 테스트
    console.log('1. 회원가입 테스트...');
    const registerResponse = await axios.post(
      `${BASE_URL}/users/register`,
      testUser,
    );
    console.log('✅ 회원가입 성공:', registerResponse.data.user.username);
    authToken = registerResponse.data.token;
    console.log('');

    // 2. 로그인 테스트
    console.log('2. 로그인 테스트...');
    const loginResponse = await axios.post(`${BASE_URL}/users/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    console.log('✅ 로그인 성공:', loginResponse.data.user.username);
    console.log('');

    // 3. 제품 등록 테스트
    console.log('3. 제품 등록 테스트...');
    const productData = {
      name: 'MacBook Pro 14인치',
      description: 'Apple M3 Pro 칩 탑재, 14인치 Liquid Retina XDR 디스플레이',
      price: 3500000,
      imageUrl: 'https://example.com/macbook.jpg',
      category: 'electronics',
    };

    const productResponse = await axios.post(
      `${BASE_URL}/products`,
      productData,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      },
    );
    console.log('✅ 제품 등록 성공:', productResponse.data.name);
    const productId = productResponse.data.id;
    console.log('');

    // 4. 투표 테스트
    console.log('4. 투표 테스트...');
    const voteData = {
      type: 'buy',
      comment: '정말 좋은 제품이에요!',
    };

    await axios.post(`${BASE_URL}/products/${productId}/vote`, voteData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log('✅ 투표 성공');
    console.log('');

    // 5. 제품 목록 조회 테스트
    console.log('5. 제품 목록 조회 테스트...');
    const productsResponse = await axios.get(`${BASE_URL}/products`);
    console.log(
      '✅ 제품 목록 조회 성공:',
      productsResponse.data.length,
      '개 제품',
    );
    console.log('');

    // 6. 개인 맞춤 추천 테스트
    console.log('6. 개인 맞춤 추천 테스트...');
    const recommendationsResponse = await axios.get(
      `${BASE_URL}/recommendations/personalized`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      },
    );
    console.log(
      '✅ 개인 맞춤 추천 성공:',
      recommendationsResponse.data.length,
      '개 추천',
    );
    console.log('');

    // 7. 리뷰 작성 테스트
    console.log('7. 리뷰 작성 테스트...');
    const reviewData = {
      content: '정말 만족스러운 제품입니다!',
      rating: 5,
      isPurchased: true,
    };

    await axios.post(`${BASE_URL}/reviews/products/${productId}`, reviewData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log('✅ 리뷰 작성 성공');
    console.log('');

    // 8. 제품 리뷰 조회 테스트
    console.log('8. 제품 리뷰 조회 테스트...');
    const reviewsResponse = await axios.get(
      `${BASE_URL}/reviews/products/${productId}`,
    );
    console.log(
      '✅ 제품 리뷰 조회 성공:',
      reviewsResponse.data.length,
      '개 리뷰',
    );
    console.log('');

    // 9. 트렌딩 제품 테스트
    console.log('9. 트렌딩 제품 테스트...');
    const trendingResponse = await axios.get(
      `${BASE_URL}/recommendations/trending`,
    );
    console.log(
      '✅ 트렌딩 제품 조회 성공:',
      trendingResponse.data.length,
      '개 제품',
    );
    console.log('');

    // 10. 마이페이지 테스트
    console.log('10. 마이페이지 테스트...');
    const mypageResponse = await axios.get(`${BASE_URL}/users/mypage`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log(
      '✅ 마이페이지 조회 성공:',
      mypageResponse.data.profile.username,
      '/',
      mypageResponse.data.myProducts.length,
      '개 등록',
    );
    console.log('');

    console.log('🎉 모든 API 테스트가 성공적으로 완료되었습니다!');
  } catch (error) {
    console.error('❌ API 테스트 실패:', error.response?.data || error.message);
  }
}

// API 테스트 실행
testAPI();
