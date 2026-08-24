type CategoryCardProps = {
  category: string;
  onClick: () => void;
};

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return <button onClick={onClick}>{category}</button>;
}
