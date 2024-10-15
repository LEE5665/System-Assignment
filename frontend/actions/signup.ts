'use server';
export default async function signup(formData: FormData) {
  // 여기에 서버로 전달할 로직을 추가하세요
  // 예시로, formData.get('name')을 사용하여 데이터를 가져올 수 있습니다.
  console.log(formData.get('name'));
}
