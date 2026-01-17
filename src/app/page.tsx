import { flat } from '@/data/flat-trav-iturribide';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{flat.title}</h1>
      <p className="text-gray-600">{flat.subtitle}</p>
      <p className="text-gray-600">
        {flat.location.area}, {flat.location.city}
      </p>
      <p className="mt-4">{flat.description}</p>
    </main>
  );
}
