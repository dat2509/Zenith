/**
 * ZENKENITH — HỆ THỐNG XỬ LÝ LOGIC, ĐỒ HỌA CANVAS 60FPS & THUẬT TOÁN MATH.JS
 */

// ==========================================
// 1. DỮ LIỆU SẢN PHẨM (100% TIẾNG VIỆT)
// ==========================================
const PRODUCTS = [
  {
    id: 'zk-01',
    name: 'Áo Thun Monolith Heavyweight',
    category: 'Áo Thun',
    price: 790000,
    badge: 'BÁN CHẠY',
    gsm: '340GSM',
    desc: 'Áo thun phom Boxy vuông vức chế tác từ 100% sợi cotton hữu cơ định lượng 340GSM. Cổ áo bo dệt dày 3.2cm chống bai dão tuyệt đối.',
    imgPrimary: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    imgSecondary: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'zk-02',
    name: 'Áo Hoodie Kiến Trúc Brutal',
    category: 'Áo Khoác & Hoodie',
    price: 1450000,
    badge: 'GIỚI HẠN',
    gsm: '480GSM',
    desc: 'Áo Hoodie nỉ bông chân cua định lượng 480GSM siêu dày, mũ áo 2 lớp đứng phom kiến trúc không cần dây rút.',
    imgPrimary: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    imgSecondary: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'zk-03',
    name: 'Quần Cargo Đa Túi Kỹ Thuật',
    category: 'Quần & Phụ Kiện',
    price: 1350000,
    badge: 'MỚI',
    gsm: 'Nylon Ripstop',
    desc: 'Quần túi hộp kỹ thuật gồm 8 ngăn chứa đồ ẩn, chất vải Nylon Ripstop trượt nước nhẹ cùng khóa kéo YKK hai chiều.',
    imgPrimary: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    imgSecondary: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'zk-04',
    name: 'Áo Thun Đồ Họa Kỷ Nguyên Số',
    category: 'Áo Thun',
    price: 850000,
    badge: '340GSM',
    gsm: '340GSM',
    desc: 'In lụa thủ công cao thành 4 lớp ở mặt lưng và ngực áo. Chất vải được xử lý wash enzyme mềm mịn và chống co rút.',
    imgPrimary: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    imgSecondary: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'zk-05',
    name: 'Áo Khoác Gió Tối Giản Zenith',
    category: 'Áo Khoác & Hoodie',
    price: 1690000,
    badge: 'CHỐNG NƯỚC',
    gsm: 'Vải Kỹ Thuật 3 Lớp',
    desc: 'Áo khoác chống gió và kháng nước tiêu chuẩn đô thị. Đường cắt raglan giải phóng chuyển động vai tối đa.',
    imgPrimary: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    imgSecondary: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'zk-06',
    name: 'Quần Dài Ống Suông Cấu Trúc',
    category: 'Quần & Phụ Kiện',
    price: 1190000,
    badge: 'THIẾT KẾ RIÊNG',
    gsm: 'Twill 380GSM',
    desc: 'Quần ống suông xếp ly đôi tạo độ rủ tự nhiên từ hông xuống mũi giày, chất vải Kaki Twill 380GSM đứng dáng.',
    imgPrimary: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    imgSecondary: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80'
  }
];

// Hàm tiện ích định dạng VNĐ và nội suy mượt (lerp)
const formatVND = (amount) => Math.round(amount).toLocaleString('vi-VN') + '₫';
const lerp = (start, end, factor) => start + (end - start) * factor;

// Thông báo nổi (Toast)
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = message;
  toast.classList.remove('translate-y-24', 'opacity-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 2600);
}

// ==========================================
// 2. HIỂN THỊ, LỌC & XEM NHANH SẢN PHẨM
// ==========================================
let activeCategory = 'all';
let activeSort = 'featured';

function renderProducts() {
  const grid = document.getElementById('product-grid');
  let list = activeCategory === 'all'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category === activeCategory);

  if (activeSort === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (activeSort === 'price-desc') list.sort((a, b) => b.price - a.price);

  grid.innerHTML = list.map(product => `
    <article class="product-card group border border-zen-black bg-white flex flex-col justify-between smooth-transition hover:-translate-y-1.5 hover:shadow-xl">
      <div>
        <div class="relative aspect-[4/5] overflow-hidden bg-neutral-200 border-b border-zen-black cursor-pointer" onclick="openQuickView('${product.id}')">
          <span class="absolute top-3 left-3 z-10 bg-zen-black text-zen-neon font-mono text-[10px] uppercase px-2.5 py-1">
            ${product.badge}
          </span>
          <span class="absolute top-3 right-3 z-10 bg-white/95 text-zen-black font-mono text-[10px] uppercase px-2 py-0.5 border border-zen-black">
            ${product.gsm}
          </span>
          <img src="${product.imgPrimary}" alt="${product.name}" class="img-primary w-full h-full object-cover" />
          <img src="${product.imgSecondary}" alt="${product.name}" class="img-secondary absolute inset-0 w-full h-full object-cover opacity-0" />
          <div class="absolute bottom-3 inset-x-3 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 smooth-transition">
            <span class="block text-center bg-white/95 text-zen-black border border-zen-black font-mono text-[11px] uppercase py-2">
              Xem Chi Tiết Nhanh
            </span>
          </div>
        </div>

        <div class="p-5">
          <p class="font-mono text-[11px] uppercase text-neutral-500">${product.category}</p>
          <h3 class="font-display font-bold text-lg uppercase mt-1 cursor-pointer hover:underline" onclick="openQuickView('${product.id}')">${product.name}</h3>
          <p class="font-mono text-sm font-bold mt-2">${formatVND(product.price)}</p>
        </div>
      </div>

      <div class="p-5 pt-0">
        <button onclick="addToCart('${product.id}', 'L')" class="w-full bg-zen-black text-zen-bone font-mono text-xs uppercase py-3.5 hover:bg-zen-neon hover:text-zen-black smooth-transition">
          + Thêm Nhanh (Size L)
        </button>
      </div>
    </article>
  `).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('bg-zen-black', 'text-zen-bone');
      b.classList.add('bg-transparent', 'text-zen-black');
    });
    btn.classList.remove('bg-transparent', 'text-zen-black');
    btn.classList.add('bg-zen-black', 'text-zen-bone');
    activeCategory = btn.dataset.cat;
    renderProducts();
  });
});

document.getElementById('sort-select').addEventListener('change', (e) => {
  activeSort = e.target.value;
  renderProducts();
});

// Hộp thoại Xem Nhanh (Quick View Modal)
let currentQVProduct = null;
let currentQVSize = 'L';
const qvModal = document.getElementById('quickview-modal');
const qvCard = document.getElementById('quickview-card');

window.openQuickView = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  currentQVProduct = product;
  currentQVSize = 'L';

  document.getElementById('qv-img').src = product.imgPrimary;
  document.getElementById('qv-cat').textContent = `${product.category} // ${product.gsm}`;
  document.getElementById('qv-name').textContent = product.name;
  document.getElementById('qv-price').textContent = formatVND(product.price);
  document.getElementById('qv-desc').textContent = product.desc;

  document.querySelectorAll('.qv-size-btn').forEach(b => {
    b.classList.toggle('bg-zen-black', b.dataset.size === 'L');
    b.classList.toggle('text-zen-bone', b.dataset.size === 'L');
  });

  qvModal.classList.remove('hidden');
  qvModal.classList.add('flex');
  requestAnimationFrame(() => {
    qvModal.classList.remove('opacity-0');
    qvCard.classList.remove('scale-95');
  });
};

function closeQuickView() {
  qvModal.classList.add('opacity-0');
  qvCard.classList.add('scale-95');
  setTimeout(() => {
    qvModal.classList.add('hidden');
    qvModal.classList.remove('flex');
  }, 450);
}

document.getElementById('close-qv-btn').addEventListener('click', closeQuickView);
qvModal.addEventListener('click', (e) => {
  if (e.target === qvModal) closeQuickView();
});

document.querySelectorAll('.qv-size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.qv-size-btn').forEach(b => {
      b.classList.remove('bg-zen-black', 'text-zen-bone');
    });
    btn.classList.add('bg-zen-black', 'text-zen-bone');
    currentQVSize = btn.dataset.size;
  });
});

document.getElementById('qv-add-btn').addEventListener('click', () => {
  if (currentQVProduct) {
    addToCart(currentQVProduct.id, currentQVSize);
    closeQuickView();
  }
});

// ==========================================
// 3. CANVAS 1: MÔ PHỎNG SỢI VẢI TƯƠNG TÁC HERO (60FPS LERP)
// ==========================================
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  const coordsEl = document.getElementById('hero-coords');

  let width, height;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    targetX = currentX = width * 0.6;
    targetY = currentY = height * 0.5;
  }

  window.addEventListener('resize', resize);
  resize();

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    coordsEl.textContent = `X:${String(Math.round(targetX)).padStart(3, '0')} Y:${String(Math.round(targetY)).padStart(3, '0')}`;
  });

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    currentX = lerp(currentX, targetX, 0.075);
    currentY = lerp(currentY, targetY, 0.075);

    const gap = 36;
    const cols = Math.ceil(width / gap);
    const rows = Math.ceil(height / gap);
    const radius = 230;

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const baseX = i * gap;
        const baseY = j * gap;
        const dx = baseX - currentX;
        const dy = baseY - currentY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let shiftX = 0;
        let shiftY = 0;

        if (dist < radius) {
          const factor = (1 - dist / radius);
          const push = factor * factor * 24;
          shiftX = (dx / (dist || 1)) * push;
          shiftY = (dy / (dist || 1)) * push;
        }

        const waveY = Math.sin(time * 0.0018 + i * 0.35 + j * 0.25) * 3.5;

        ctx.beginPath();
        ctx.arc(baseX + shiftX, baseY + shiftY + waveY, dist < radius ? 1.8 : 1.2, 0, Math.PI * 2);
        ctx.fillStyle = dist < radius ? '#C8FF00' : 'rgba(245, 244, 240, 0.24)';
        ctx.fill();
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// ==========================================
// 4. PHÒNG ĐO PHOM DÁNG (TÍNH TOÁN NGẦM BẰNG MATH.JS)
// ==========================================
let fitAlpha = 1.0;
let targetF = 0.84;
let targetD = 2.42;
let currentF = 0.84;
let currentD = 2.42;

const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');
const shoulderInput = document.getElementById('shoulder-input');

function updateFitLab() {
  const H = Number(heightInput.value);
  const W = Number(weightInput.value);
  const S = Number(shoulderInput.value);

  document.getElementById('height-val').textContent = `${H} cm`;
  document.getElementById('weight-val').textContent = `${W} kg`;
  document.getElementById('shoulder-val').textContent = `${S} cm`;

  // Sử dụng math.evaluate() tính chỉ số hình thể & độ rủ tự nhiên
  const scope = { H, W, S, alpha: fitAlpha, GSM: 340 };
  targetF = math.evaluate('(W / sqrt(H * S)) * alpha + 0.12 * (S / 45)^2', scope);
  targetD = math.evaluate('(GSM / 300) * log(1 + (H * S) / 1000) * (alpha ^ -0.5)', scope);

  let size = 'M';
  let matchPercent = 88;
  let advice = 'Phom áo cân đối vừa vặn với khung vai, tạo cảm giác gọn gàng và linh hoạt khi vận động.';

  if (targetF < 0.78) {
    size = 'S';
    matchPercent = 92;
    advice = 'Size S ôm gọn phần cầu vai, tôn dáng thanh thoát nhưng vẫn giữ được độ đứng phom của vải cotton 340GSM.';
  } else if (targetF < 0.92) {
    size = 'M';
    matchPercent = 95;
    advice = 'Size M mang lại tỷ lệ chuẩn xác giữa chiều dài lưng áo và độ mở ngang ngực của bạn.';
  } else if (targetF < 1.06) {
    size = 'L';
    matchPercent = 96;
    advice = 'Size L tạo độ trễ vai nhẹ chuẩn phong cách đường phố đương đại, thoải mái suốt cả ngày.';
  } else {
    size = 'XL';
    matchPercent = 94;
    advice = 'Size XL rộng rãi tối đa, tạo khối kiến trúc vuông vức mạnh mẽ và che khuyết điểm hoàn hảo.';
  }

  document.getElementById('rec-size').textContent = size;
  document.getElementById('fit-bar-percent').textContent = `${matchPercent}%`;
  document.getElementById('fit-progress-bar').style.width = `${matchPercent}%`;
  document.getElementById('fit-advice').textContent = advice;
}

function animateFitLabValues() {
  currentF = lerp(currentF, targetF, 0.14);
  currentD = lerp(currentD, targetD, 0.14);
  document.getElementById('fit-index-val').textContent = currentF.toFixed(2);
  document.getElementById('drape-index-val').textContent = currentD.toFixed(2);
  requestAnimationFrame(animateFitLabValues);
}

[heightInput, weightInput, shoulderInput].forEach(el => {
  el.addEventListener('input', updateFitLab);
});

document.querySelectorAll('.fit-pref-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fit-pref-btn').forEach(b => {
      b.classList.remove('bg-zen-black', 'text-zen-bone');
      b.classList.add('bg-white', 'text-zen-black');
    });
    btn.classList.remove('bg-white', 'text-zen-black');
    btn.classList.add('bg-zen-black', 'text-zen-bone');
    fitAlpha = Number(btn.dataset.alpha);
    updateFitLab();
  });
});

// ==========================================
// 5. CANVAS 2: XƯỞNG THIẾT KẾ ÁO ĐỘC BẢN 1-1
// ==========================================
const studioState = {
  color: '#0A0A0A',
  colorName: 'Đen Tuyền',
  pattern: 'grid',
  targetDensity: 12,
  currentDensity: 12,
  text: 'ZENKENITH // 01',
  size: 'L'
};

function initStudioCanvas() {
  const canvas = document.getElementById('studio-canvas');
  const ctx = canvas.getContext('2d');

  function drawGarmentBase() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(160, 70);
    ctx.lineTo(210, 70);
    ctx.quadraticCurveTo(260, 96, 310, 70);
    ctx.lineTo(360, 70);
    ctx.lineTo(458, 155);
    ctx.lineTo(412, 222);
    ctx.lineTo(365, 185);
    ctx.lineTo(365, 452);
    ctx.lineTo(155, 452);
    ctx.lineTo(155, 185);
    ctx.lineTo(108, 222);
    ctx.lineTo(62, 155);
    ctx.closePath();

    ctx.fillStyle = studioState.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0A0A0A';
    ctx.stroke();

    // Đường may viền cổ áo
    ctx.beginPath();
    ctx.quadraticCurveTo(260, 108, 315, 75);
    ctx.strokeStyle = studioState.color === '#F5F4F0' ? '#D4D4D8' : '#27272A';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  function renderStudio(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    studioState.currentDensity = lerp(studioState.currentDensity, studioState.targetDensity, 0.12);
    const count = Math.round(studioState.currentDensity);

    drawGarmentBase();

    const isLight = studioState.color === '#F5F4F0';
    const inkColor = isLight ? '#0A0A0A' : '#C8FF00';

    ctx.save();
    ctx.strokeStyle = inkColor;
    ctx.fillStyle = inkColor;
    ctx.lineWidth = 1.5;

    const cx = 260;
    const cy = 270;

    if (studioState.pattern === 'grid') {
      const box = 140;
      const step = box / count;
      for (let i = 0; i <= count; i++) {
        const p = -box / 2 + i * step;
        ctx.beginPath();
        ctx.moveTo(cx - box / 2, cy + p);
        ctx.lineTo(cx + box / 2, cy + p);
        ctx.moveTo(cx + p, cy - box / 2);
        ctx.lineTo(cx + p, cy + box / 2);
        ctx.stroke();
      }
    } else if (studioState.pattern === 'wave') {
      for (let i = 0; i < count; i++) {
        ctx.beginPath();
        const yBase = cy - 65 + (i * 130) / count;
        for (let x = -72; x <= 72; x += 4) {
          const y = yBase + Math.sin(x * 0.065 + time * 0.003 + i * 0.45) * 9;
          if (x === -72) ctx.moveTo(cx + x, y);
          else ctx.lineTo(cx + x, y);
        }
        ctx.stroke();
      }
    } else if (studioState.pattern === 'orbit') {
      for (let i = 1; i <= count; i++) {
        ctx.beginPath();
        const r = (i / count) * 74;
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(studioState.text.toUpperCase(), cx, 155);

    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`ĐỘC BẢN 1-1 // SIZE ${studioState.size} // 340GSM`, cx, 390);
    ctx.restore();

    requestAnimationFrame(renderStudio);
  }

  requestAnimationFrame(renderStudio);
}

document.querySelectorAll('.color-swatch').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('border-2', 'border-zen-neon'));
    btn.classList.add('border-2', 'border-zen-neon');
    studioState.color = btn.dataset.color;
    studioState.colorName = btn.dataset.name;
    document.getElementById('selected-color-name').textContent = btn.dataset.name;
  });
});

document.querySelectorAll('.pattern-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pattern-btn').forEach(b => {
      b.classList.remove('bg-zen-black', 'text-zen-bone');
      b.classList.add('bg-transparent', 'text-zen-black');
    });
    btn.classList.remove('bg-transparent', 'text-zen-black');
    btn.classList.add('bg-zen-black', 'text-zen-bone');
    studioState.pattern = btn.dataset.pattern;
  });
});

document.querySelectorAll('.studio-size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.studio-size-btn').forEach(b => {
      b.classList.remove('bg-zen-black', 'text-zen-bone');
    });
    btn.classList.add('bg-zen-black', 'text-zen-bone');
    studioState.size = btn.dataset.size;
  });
});

document.getElementById('density-input').addEventListener('input', (e) => {
  studioState.targetDensity = Number(e.target.value);
  document.getElementById('density-val').textContent = e.target.value;
});

document.getElementById('custom-text').addEventListener('input', (e) => {
  studioState.text = e.target.value || 'ZENKENITH';
});

document.getElementById('add-custom-btn').addEventListener('click', () => {
  const item = {
    id: `custom-${Date.now()}`,
    name: `Áo Độc Bản 1-1 (${studioState.colorName} / "${studioState.text.toUpperCase()}")`,
    size: studioState.size,
    price: 1290000,
    qty: 1
  };
  cart.push(item);
  updateCartUI();
  openCart();
  showToast('Đã thêm Áo Độc Bản 1-1 vào giỏ hàng');
});

// ==========================================
// 6. GIỎ HÀNG & TÍNH CHIẾT KHẤU BẬC THANG (MATH.JS)
// ==========================================
let cart = [];
let promoRate = 0;

const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');

function openCart() {
  cartOverlay.classList.remove('hidden');
  requestAnimationFrame(() => {
    cartOverlay.classList.remove('opacity-0');
    cartDrawer.classList.remove('translate-x-full');
  });
}

function closeCart() {
  cartOverlay.classList.add('opacity-0');
  cartDrawer.classList.add('translate-x-full');
  setTimeout(() => cartOverlay.classList.add('hidden'), 500);
}

document.getElementById('open-cart-btn').addEventListener('click', openCart);
document.getElementById('close-cart-btn').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

window.addToCart = function(productId, size = 'L') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cartKey = `${product.id}-${size}`;
  const existing = cart.find(item => item.id === cartKey);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: cartKey,
      name: product.name,
      size: size,
      price: product.price,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`Đã thêm ${product.name} (Size ${size})`);
};

window.changeQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartUI();
};

document.getElementById('apply-promo-btn').addEventListener('click', () => {
  const code = document.getElementById('promo-input').value.trim().toUpperCase();
  if (code === 'ZEN10') {
    promoRate = 0.10;
    showToast('Đã áp dụng mã ZEN10 (-10%)');
  } else {
    promoRate = 0;
    showToast('Mã không hợp lệ. Hãy thử mã ZEN10');
  }
  updateCartUI();
});

function updateCartUI() {
  const cartItemsEl = document.getElementById('cart-items');
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = totalQty;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="text-center py-16 font-mono text-xs text-neutral-400">
        GIỎ HÀNG CỦA BẠN ĐANG TRỐNG
      </div>
    `;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="border border-zen-black p-4 bg-white flex justify-between items-center gap-3">
        <div>
          <span class="font-mono text-[10px] uppercase bg-zen-black text-zen-neon px-1.5 py-0.5">SIZE ${item.size}</span>
          <h4 class="font-display font-bold text-sm uppercase mt-1">${item.name}</h4>
          <p class="font-mono text-xs text-neutral-500 mt-0.5">${formatVND(item.price)} × ${item.qty}</p>
        </div>
        <div class="flex items-center gap-1.5 font-mono text-xs">
          <button onclick="changeQty('${item.id}', -1)" class="w-7 h-7 border border-zen-black hover:bg-zen-black hover:text-zen-bone smooth-transition">-</button>
          <span class="w-6 text-center font-bold">${item.qty}</span>
          <button onclick="changeQty('${item.id}', 1)" class="w-7 h-7 border border-zen-black hover:bg-zen-black hover:text-zen-bone smooth-transition">+</button>
        </div>
      </div>
    `).join('');
  }

  // Tính toán tổng tiền và chiết khấu bậc thang bằng math.evaluate()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const bundleRate = totalQty >= 3 ? 0.15 : (totalQty === 2 ? 0.08 : 0);

  const finalTotal = math.evaluate('subtotal * (1 - bundleRate) * (1 - promoRate)', {
    subtotal,
    bundleRate,
    promoRate
  });

  const discountAmount = subtotal - finalTotal;

  document.getElementById('cart-subtotal').textContent = formatVND(subtotal);
  document.getElementById('cart-discount').textContent = '-' + formatVND(discountAmount);
  document.getElementById('cart-total').textContent = formatVND(finalTotal);
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    showToast('Giỏ hàng của bạn đang trống!');
    return;
  }
  showToast('Đặt hàng thành công! Cảm ơn bạn đã chọn ZENKENITH.');
  cart = [];
  promoRate = 0;
  document.getElementById('promo-input').value = '';
  updateCartUI();
  closeCart();
});

document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.reset();
  showToast('Đã đăng ký nhận bản tin nội bộ ZENKENITH!');
});

// ==========================================
// 7. KHỞI CHẠY TOÀN BỘ ỨNG DỤNG
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initHeroCanvas();
  updateFitLab();
  animateFitLabValues();
  initStudioCanvas();
  updateCartUI();
});