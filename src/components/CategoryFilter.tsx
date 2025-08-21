import { useStore } from '../store/useStore';
import { categories } from '../data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  console.log('CategoryFilter render - Selected category:', selectedCategory);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Categorías</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className="w-full justify-between"
            onClick={() => setSelectedCategory(category.id)}
          >
            <span>{category.name}</span>
            <Badge variant="secondary">{category.count}</Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;