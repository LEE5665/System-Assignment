import { RouteParams } from 'next';
import Check from 'src/componets/Check';

export default function Home({ params }: RouteParams) {
  //대충 일케일케하면 될듯?
  return (
    <div>
      <Check params={params} />
    </div>
  );
}
