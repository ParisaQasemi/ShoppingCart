const products = [
    {
        id:1,
        image: 'assets/img/d19fe5363652c2da0f224fbb28c3e7928f60b65a_1628087256.webp',
        name: 'مدادنوکی',
        price: 50,
    },
    {
        id:2,
        image: 'assets/img/8a3f77f331c91b344cb5a74f3653a7875ac93a5d_1658316361.webp',
        name: 'کتاب',
        price: 240,
    },
    {
        id:3,
        image: 'assets/img/111068141.webp',
        name: 'چراغ مطالعه',
        price: 300,
    },
    {
        id:4,
        image: 'assets/img/123dlfmf.webp',
        name: 'تخته وایتبرد',
        price: 88,
    },
]

let cart = {
    items: [],
    total: 0
}

const renderProduct = () => {
    const productDiv = document.querySelector('.products');
    productDiv.innerHTML = '';

    products.forEach((item,index) => {
        productDiv.innerHTML +=
        `
        <div class="product">
            <div class="product__img">
                <img src="${item.image}" alt="">
            </div>
            <div class="product__title">${item.name}</div>
            <div class="product__Price">${item.price} تومن</div>
            <button class="add_to_cart" onclick="addToCart(${index})">افزودن به سبد خرید</button>
        </div>
        `
    })
}

const renderCartItem = () => {
    const CartDiv = document.querySelector('.cart__items');
    CartDiv.innerHTML = '';

    const totalPriceEI = document.querySelector('.cart__total_price')

    let totalPrice = 0;

    if(cart.items.lenght === 0){
        CartDiv.innerHTML = 'محصولی در سبد خرید وجود ندارد'
    }
    
    cart.items.forEach((item) => {
        totalPrice += item.total

        CartDiv.innerHTML +=
        `
        <div class="cart__item">
            <div class="col-md-4">
                <button class="cart__item_remove" onclick="removeFromCart('${item.name}')">حذف</button>
            </div>
            <div class="col-md-4">
                <div class="qty">${item.qty}</div>
            </div>
            <div class="col-md-4">
            <h3 class="cart__item_title">${item.name}</h3>
            </div>
        </div>
        `
    })

    totalPriceEI.innerHTML = `مجموع: ${totalPrice} تومان`
}

const addToCart = (productIndex) => {
    const product = products[productIndex]

    let existingProduct = false

    let newCartItems = cart.items.reduce((state, item) => {
        if(item.name === product.name){
            existingProduct = true;

            const newItem = {
                ...item,
                qty: item.qty + 1,
                total: (item.qty + 1) * item.price
            }

            return [...state, newItem]
        }

        return [...state, item]
    }, [])

    if(!existingProduct) {
        newCartItems.push({
            ...product,
            qty: 1,
            total: product.price,
        })
    }

    cart = {
        ...cart,
        items: newCartItems,
    }

    renderCartItem()
}

const removeFromCart = (productName) => {
    let newCartItems = cart.items.reduce((state,item) => {
        if(item.name === productName) {
            const newItem = {
                ...item,
                qty: item.qty - 1,
                total: (item.qty - 1) * item.price
            }

            if (newItem.qty > 0) {
                return [...state, newItem]
            }
            else {
                return state
            }
        }

        return [...state, item]
    }, [])

    cart = {
        ...cart,
        items: newCartItems
    }

    renderCartItem()
}
   
renderProduct();
renderCartItem();


