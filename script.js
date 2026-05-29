// Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle?.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('.card').forEach(c=>c.classList.toggle('dark-mode'));
    document.querySelectorAll('.cart-item').forEach(c=>c.classList.toggle('dark-mode'));
    document.querySelectorAll('form').forEach(f=>f.classList.toggle('dark-mode'));
});

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item){
    const existing = cart.find(i=>i.id===item.id);
    if(existing) existing.qty++;
    else cart.push({...item, qty:1});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Rs.{item.name} added to cart`);
}

// Render Cart
function renderCart(){
    const container = document.getElementById('cartContainer');
    const totalEl = document.getElementById('totalPrice');
    const qtyEl = document.getElementById('totalQty');
    if(!container) return;
    container.innerHTML='';
    let total=0, qty=0;
    cart.forEach(item=>{
        total+=item.price*item.qty;
        qty+=item.qty;
        const div = document.createElement('div');
        div.className='cart-item';
        div.innerHTML=`
            <span>${item.name} x ${item.qty}</span>
            <span>$${(item.price*item.qty).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        container.appendChild(div);
    });
    totalEl.textContent=total.toFixed(2);
    qtyEl.textContent=qty;
}

function removeFromCart(id){
    cart=cart.filter(i=>i.id!==id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}