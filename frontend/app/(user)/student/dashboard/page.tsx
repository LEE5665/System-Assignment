export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  return {
    title: id,
  };
}
export default function Page() {
  return <div />;
}
