import mobiles from '../../assets/images/Categories/phone.png';
import fashion from '../../assets/images/Categories/fashion.png';
import electronics from '../../assets/images/Categories/electronics.png';
import home from '../../assets/images/Categories/home.png';
import travel from '../../assets/images/Categories/travel.png';
import appliances from '../../assets/images/Categories/appliances.png';
import furniture from '../../assets/images/Categories/furniture.png';
import beauty from '../../assets/images/Categories/beauty.png';
import grocery from '../../assets/images/Categories/grocery.png';
import { Link } from 'react-router-dom';

const catNav = [
    {
        name: "Mobiles",
        icon: mobiles,
    },
    {
        name: "Fashion",
        icon: fashion,
    },
    {
        name: "Electronics",
        icon: electronics,
    },
    {
        name: "Home",
        icon: home,
    },
    {
        name: "Travel",
        icon: travel,
    },
    {
        name: "Appliances",
        icon: appliances,
    },
    {
        name: "Furniture",
        icon: furniture,
    },
    {
        name: "Beauty,Toys & more",
        icon: beauty,
    },
    {
        name: "Grocery",
        icon: grocery,
    },
]

const Categories = () => {
    return (
        <section className="hidden sm:block bg-white mt-10 mb-4 min-w-full px-12 py-1 shadow overflow-hidden">

            <div className="flex items-center justify-between mt-4">

                {catNav.map((item, i) => (
                    <Link to={`/products?category=${item.name}`} className="flex flex-col gap-1 items-center p-2 group" key={i}>
                        <div className="h-16 w-16">
                            <img draggable="false" className="h-full w-full object-contain" src={item.icon} alt={item.name} />
                        </div>
                        <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">{item.name}</span>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default Categories;
