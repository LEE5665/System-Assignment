import { RouteParams } from 'next';

export default function Check({ params }: RouteParams) {
  return (
    <div>
      <p>{params.userid}</p>
    </div>
  );
}
