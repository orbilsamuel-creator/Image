// ==================== SECURITY INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Simulate security check delay
    setTimeout(initializeSecurity, 1500);
});

function initializeSecurity() {
    const torCheck = document.getElementById('torCheck');
    const threatCheck = document.getElementById('threatCheck');
    const ipCheck = document.getElementById('ipCheck');
    const securityAlert = document.getElementById('securityAlert');
    const mainContainer = document.getElementById('mainContainer');
    const sessionID = generateSessionID();
    
    // Update session IDs
    document.getElementById('sessionID').textContent = sessionID;
    document.getElementById('footerSessionID').textContent = sessionID;
    
    // Step 1: Tor Detection (Heuristic)
    setTimeout(() => {
        const isTor = detectTorBrowser();
        torCheck.innerHTML = isTor ? 
            '✅ Tor Browser Detected' : 
            '⚠️ Tor Not Detected - Proceed with Caution';
        torCheck.style.color = isTor ? '#00ff00' : '#ffff00';
    }, 800);
    
    // Step 2: Threat Detection
    setTimeout(() => {
        const threatLevel = scanForThreats();
        threatCheck.innerHTML = threatLevel === 'low' ? 
            '✅ No Forensic Tools Detected' : 
            `⚠️ ${threatLevel.toUpperCase()} Threat Level`;
        threatCheck.style.color = threatLevel === 'low' ? '#00ff00' : '#ff9900';
        document.getElementById('threatLevelText').textContent = threatLevel.charAt(0).toUpperCase() + threatLevel.slice(1);
    }, 1200);
    
    // Step 3: IP/Environment Check
    setTimeout(() => {
        const isClean = checkEnvironment();
        ipCheck.innerHTML = isClean ? 
            '✅ Clean Environment' : 
            '⚠️ Suspicious Environment Detected';
        ipCheck.style.color = isClean ? '#00ff00' : '#ff5555';
        
        // Finalize security check
        setTimeout(() => {
            securityAlert.style.opacity = '0';
            setTimeout(() => {
                securityAlert.style.display = 'none';
                mainContainer.style.display = 'block';
                document.getElementById('securityStatus').style.color = '#00ff00';
                loadProducts();
                loadServices();
                generateDailyKey();
                generateDropLocation();
            }, 500);
        }, 1000);
    }, 1600);
}

function generateSessionID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return 'H4X-' + result;
}

function detectTorBrowser() {
    // Heuristic Tor detection
    const ua = navigator.userAgent.toLowerCase();
    const isFirefox = ua.includes('firefox');
    const hasTorSignature = navigator.plugins.length === 0 || 
                           window.screen.colorDepth === 24 ||
                           navigator.hardwareConcurrency <= 4;
    
    // Check for common Tor Browser properties
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isCommonTorTZ = ['UTC', 'GMT'].includes(timezone);
    
    return (isFirefox && hasTorSignature) || isCommonTorTZ;
}

function scanForThreats() {
    const ua = navigator.userAgent.toLowerCase();
    const threats = [
        'sqlmap', 'nikto', 'nessus', 'metasploit', 'burpsuite', 'zap',
        'w3af', 'hydra', 'nmap', 'openvas', 'acunetix', 'netsparker',
        'appscan', 'wireshark', 'fiddler', 'charles', 'postman'
    ];
    
    // Check for VM/VMware indicators
    const isVM = navigator.plugins.length < 5 || 
                 navigator.hardwareConcurrency < 2 ||
                 window.screen.width < 1024;
    
    const hasThreat = threats.some(threat => ua.includes(threat));
    
    if (hasThreat) return 'high';
    if (isVM) return 'medium';
    return 'low';
}

function checkEnvironment() {
    // Check for common debugging tools
    const devTools = {
        isFirebug: () => window.firebug || (console.firebug || console.exception && console.table),
        isDevTools: () => {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            return widthThreshold || heightThreshold;
        }
    };
    
    // Check for automation tools
    const isAutomated = navigator.webdriver || 
                       window.callPhantom || 
                       window._phantom || 
                       window.phantom;
    
    return !(devTools.isDevTools() || devTools.isFirebug() || isAutomated);
}


// ==================== MOBILE OPTIMIZATION ====================
function optimizeForMobile() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Adjust viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        // Add touch event listeners for better UX
        document.querySelectorAll('.product-card, .service-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(0, 100, 255, 0.1)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.backgroundColor = '';
            });
        });
        
        // Prevent zoom on input focus
        document.querySelectorAll('input, textarea, select').forEach(el => {
            el.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
            
            el.addEventListener('blur', function() {
                this.style.fontSize = '';
            });
        });
        
        // Add swipe gesture for modal close
        let startX, startY;
        const modal = document.getElementById('productModal');
        
        modal.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        modal.addEventListener('touchmove', function(e) {
            if (!startX || !startY) return;
            
            const diffX = e.touches[0].clientX - startX;
            const diffY = e.touches[0].clientY - startY;
            
            // If vertical swipe > 50px, close modal
            if (Math.abs(diffY) > 50 && Math.abs(diffY) > Math.abs(diffX)) {
                closeModal();
            }
        });
        
        console.log('[H4XRUMS] Mobile optimization applied');
    }
}

// Call this function after page loads
setTimeout(optimizeForMobile, 1000);
















// ==================== PRODUCT DATABASE ====================
const products = [
    {
        id: 'C7-V4',
        name: 'CraxsRAT V7.4',
        price: '350 EGP',
        DollarPrice: '7.5 USD',
        image: 'https://github.com/orbilsamuel-creator/Image/blob/main/1S.png',
        color: '#ff5555',
        description: 'Advanced Remote Administration Tool with complete device control, screen recording, and file management.',
        features: [
            'Full device control (camera, mic, files)',
            'Screen recording & live streaming',
            'Keylogger with cloud sync',
            'Dropper For Evasion of Android 13+ Acssesability Protection',
            'Undetectable With Any FUD Scripts',
            'Full Self Destruct/Self Removal kit',
            'Remove All Data And Phone Distruction when admin permission Provided'  
        ],
        tutorial: [
            'Send encrypted order with code: C7-V4 to Our Telegram Or one of Our Dropping Links',
            'Receive download link and builder',
            'Extract With Password Given And see tutorial video in Arabic & English Sub'
            'Configure server IP in builder',
            'Build client and deploy payload',
            'Connect to CraxsRAT V7.4 panel via provided With Windows 7,10,11'
        ]
    },
    {
        id: 'C-V3',
        name: 'CyperRAT V3.4',
        price: '150 EGP',
        DollarPrice: '3.5 USD',
        image: 'https://github.com/orbilsamuel-creator/Image/blob/main/%D8%AA%D8%B7%D8%A8%D9%8A%D9%82-Cypher-Rat.png',
        color: '#00aa00',
        description: 'Lightweight RAT perfect for beginners with essential features.',
        features: [
            'Basic device control',
            'File manager',
            'SMS/call logs',
            'Location tracking',
            'Simple interface',
            'Live Camera & Live Screen Control' 
        ],
        tutorial: [
            'Order with code: C-V3',
            'Receive ZIP file with tutorial',
            'Extract and run cypher.exe',
            'Set up no-ip for connection',
            'Test on virtual machine first'
        ]
    },
    {
        id: 'XW-SYS',
        name: 'XwormRAT',
        price: '600 EGP',
        scPrice: '3.00 SC',
        image: 'https://github.com/orbilsamuel-creator/Image/blob/main/images.jpeg',
        color: '#ff00ff',
        description: 'Premium RAT with banking features and anti-analysis.',
        features: [
            'Banking injection modules',
            'Anti-VM, anti-debug',
            'Cryptocurrency wallet stealer',
            'Discord token grabber',
            'Automatic updates'
        ],
        tutorial: [
            'Advanced setup required',
            'Use provided VPS configuration',
            'Install required dependencies',
            'Configure domains for C2',
            'Test with EDR bypass enabled'
        ]
    },
    {
        id: 'Q-R',
        name: 'QuasarRAT',
        price: '80 EGP',
        scPrice: '0.40 SC',
        image: '☄',
        color: '#ff9900',
        description: 'Open-source RAT with powerful features and community support.',
        features: [
            'Open-source customization',
            'Remote desktop',
            'Process manager',
            'Registry editor',
            'Active development'
        ],
        tutorial: [
            'Download from official GitHub',
            'Compile with Visual Studio',
            'Configure listener settings',
            'Build client executable',
            'Test connectivity'
        ]
    },
    {
        id: 'G700-FW',
        name: 'G700RAT',
        price: '500 EGP',
        scPrice: '2.50 SC',
        image: 'https://github.com/orbilsamuel-creator/Image/blob/main/hq720.jpg',
        color: '#00aaff',
        description: 'Firewall-evading RAT with military-grade encryption.',
        features: [
            'AES-256 encryption',
            'Firewall/UAC bypass',
            'Process hollowing',
            'Domain generation algorithm',
            'Zero network alerts'
        ],
        tutorial: [
            'Requires Windows Server',
            'Set up SSL certificates',
            'Configure port forwarding',
            'Use dynamic DNS service',
            'Test with WireShark monitoring'
        ]
    },
    {
        id: 'ES-M',
        name: 'EagleSPY',
        price: '400 EGP',
        scPrice: '2.00 SC',
        image: '📱🔓',
        color: '#aa00ff',
        description: 'Monitoring suite focused on stealth and data collection.',
        features: [
            'Hidden camera activation',
            'Ambient recording',
            'Social media monitoring',
            'GPS tracking',
            'Email/SMS interception'
        ],
        tutorial: [
            'Install on target device physically',
            'Grant necessary permissions',
            'Configure monitoring intervals',
            'Access dashboard via web',
            'Export reports automatically'
        ]
    },
    {
        id: 'BN-C',
        name: 'Botnet Cluster',
        price: 'Varies',
        scPrice: '10+ SC',
        image: '🤖',
        color: '#00ffaa',
        description: 'Custom botnet setup for DDoS, mining, or proxy networks.',
        features: [
            '100-10,000 node capacity',
            'DDoS protection bypass',
            'Cryptocurrency miner',
            'SOCKS5 proxy network',
            'C2 panel with analytics'
        ],
        tutorial: [
            'Consultation required',
            'Define botnet purpose',
            'Choose infection vector',
            'Set up command servers',
            'Deploy and monitor growth'
        ]
    },
    {
        id: 'KL-S',
        name: 'Keylogger Suite',
        price: '200 EGP',
        scPrice: '1.00 SC',
        image: '⌨️',
        color: '#ffff00',
        description: 'Advanced keylogging with form grabbing and screenshot capabilities.',
        features: [
            'Form data capturing',
            'Periodic screenshots',
            'Clipboard monitoring',
            'Cloud storage sync',
            'Email/SMS reporting'
        ],
        tutorial: [
            'Configure email/SMS reports',
            'Set capture intervals',
            'Test on target machine',
            'Check data collection',
            'Analyze captured data'
        ]
    }
];

const services = [
    {
        id: 'WA-IM',
        name: 'WhatsApp Account Recovery',
        price: '100 EGP',
        scPrice: '0.50 SC',
        time: '2-4 hours',
        description: 'Full access to WhatsApp account including messages and media.',
        steps: [
            'Provide target phone number',
            'We perform SIM swap or verification bypass',
            'You receive login credentials',
            'Change security settings immediately'
        ]
    },
    {
        id: 'FB-IM',
        name: 'Facebook Account Access',
        price: '250 EGP',
        scPrice: '1.25 SC',
        time: '6-12 hours',
        description: 'Complete Facebook account penetration with friend list and messages.',
        steps: [
            'Provide target profile URL or email',
            'Phishing or security question bypass',
            '2FA removal if present',
            'Full access delivery'
        ]
    },
    {
        id: 'IG-IM',
        name: 'Instagram Account Penetration',
        price: '200 EGP',
        scPrice: '1.00 SC',
        time: '4-8 hours',
        description: 'Access to Instagram DMs, stories, and saved content.',
        steps: [
            'Target username required',
            'Session hijacking or exploit',
            'Access to all account features',
            'Includes business account tools'
        ]
    },
    {
        id: 'IG-SS',
        name: 'Instagram Surveillance',
        price: '300 EGP',
        scPrice: '1.50 SC',
        time: '24/7 monitoring',
        description: 'Continuous monitoring of Instagram activity without account access.',
        steps: [
            'Set up monitoring profile',
            'Real-time activity tracking',
            'DM and story monitoring',
            'Weekly activity reports'
        ]
    },
    {
        id: 'TG-IM',
        name: 'Telegram Account Access',
        price: '170 EGP',
        scPrice: '0.85 SC',
        time: '3-6 hours',
        description: 'Complete Telegram account compromise including secret chats.',
        steps: [
            'Phone number required',
            'SMS interception or SIM swap',
            'Session export for Telegram Web',
            'Full message history access'
        ]
    },
    {
        id: 'GM-IM',
        name: 'Gmail Account Recovery',
        price: '120 EGP',
        scPrice: '0.60 SC',
        time: '2-5 hours',
        description: 'Access to Gmail account and linked Google services.',
        steps: [
            'Target email address',
            'Password reset bypass',
            'Recovery email/phone change',
            'Full inbox access'
        ]
    },
    {
        id: 'SMP',
        name: 'Social Media Package',
        price: '1000 EGP',
        scPrice: '5.00 SC',
        time: '24 hours',
        description: 'Complete takeover of all social media accounts via SIM swap.',
        steps: [
            'Target phone number',
            'SIM swap execution',
            'Reset all social media passwords',
            'Bundle delivery of all accounts'
        ]
    },
    {
        id: 'RA-A',
        name: 'Android Remote Access',
        price: '700 EGP',
        scPrice: '3.50 SC',
        time: 'Instant delivery',
        description: 'Full Android device control with screen sharing.',
        steps: [
            'Physical access required for 5 minutes',
            'APK installation and hiding',
            'Connection to control panel',
            '24/7 device monitoring'
        ]
    }
];

// ==================== PAGE MANAGEMENT ====================
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update URL hash
    window.location.hash = pageId;
}

// ==================== PRODUCT LOADING ====================
function loadProducts() {
    const grid = document.getElementById('toolsGrid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image" style="background: linear-gradient(45deg, ${product.color}22, #1a1a2e);">
                <span style="font-size: 3em;">${product.image}</span>
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description.substring(0, 80)}...</p>
            <div class="product-price">${product.price}</div>
            <div class="product-sc">${product.scPrice} (Stability Credits)</div>
            <div class="product-code">Code: ${product.id}</div>
            <button class="btn-view" onclick="showProductModal('${product.id}')">View Details & Tutorial</button>
        `;
        grid.appendChild(card);
    });
}

function loadServices() {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = '';
    
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <h3 class="product-title">${service.name}</h3>
            <p>${service.description}</p>
            <div class="product-price">${service.price}</div>
            <div class="product-sc">${service.scPrice} | Time: ${service.time}</div>
            <div class="product-code">Code: ${service.id}</div>
            <button class="btn-view" onclick="showServiceModal('${service.id}')">Ordering Instructions</button>
        `;
        grid.appendChild(card);
    });
}

// ==================== MODAL SYSTEM ====================
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="modal-product-image" style="background: linear-gradient(45deg, ${product.color}44, #1a1a2e);">
            <span style="font-size: 4em;">${product.image}</span>
        </div>
        <h2>${product.name}</h2>
        <div class="product-price-large">${product.price} | ${product.scPrice}</div>
        <div class="product-code-large">Order Code: <strong>${product.id}</strong></div>
        
        <p>${product.description}</p>
        
        <h3>✨ Features:</h3>
        <ul>
            ${product.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        
        <div class="modal-tutorial">
            <h3>📖 Acquisition Tutorial:</h3>
            <ol>
                ${product.tutorial.map((step, i) => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <h3>🔐 How to Order:</h3>
        <ol>
            <li>Prepare PGP message with verification code: <code>THESHADOWPENTESTXX123</code></li>
            <li>Include order code: <strong>${product.id}</strong></li>
            <li>Encrypt with today's public key (see Tutorials page)</li>
            <li>Post to the secure drop location</li>
            <li>Wait for encrypted reply with payment instructions</li>
        </ol>
        
        <button class="btn-primary" style="width: 100%; margin-top: 20px;" onclick="copyOrderCode('${product.id}')">
            Copy Order Code: ${product.id}
        </button>
    `;
    
    modal.style.display = 'flex';
}

function showServiceModal(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    const modal = document.getElementById('productModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h2>${service.name}</h2>
        <div class="product-price-large">${service.price} | ${service.scPrice}</div>
        <div class="product-code-large">Service Code: <strong>${service.id}</strong></div>
        <div class="service-time">⏱️ Completion Time: ${service.time}</div>
        
        <p>${service.description}</p>
        
        <div class="modal-tutorial">
            <h3>🔄 Service Process:</h3>
            <ol>
                ${service.steps.map((step, i) => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <h3>📋 Requirements:</h3>
        <ul>
            <li>Target information (username/email/phone)</li>
            <li>Patience for completion time</li>
            <li>Secure communication channel</li>
            <li>Payment ready upon success</li>
        </ul>
        
        <h3>🔐 How to Order Service:</h3>
        <ol>
            <li>Include verification code in PGP message: <code>THESHADOWPENTESTXX123</code></li>
            <li>Specify service code: <strong>${service.id}</strong></li>
            <li>Provide target information (encrypted)</li>
            <li>Encrypt with today's public key</li>
            <li>Post to secure drop location</li>
            <li>We'll contact with timeline and price confirmation</li>
        </ol>
        
        <div class="warning-box" style="margin-top: 20px;">
            <h4>⚠️ Important:</h4>
            <p>Service success rate: 92%. If unsuccessful within 48 hours, 50% refund.</p>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function copyOrderCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert(`Order code "${code}" copied to clipboard!`);
    });
}

// ==================== PGP SYSTEM ====================
function generateDailyKey() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    const keyId = `${day}${month}${year}`.split('').reverse().join('');
    const key = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: H4XRUMS 1.0
Comment: Daily Key ${day}/${month}/${year}

xjMEZABCXRYJKwYBBAHaRw8BAQdAFzKcJYV6jqo7XqjM6v7s5RqL6T8LtK7N
2PpX9tKNzNTNL0p1c2VySWQgPSAiSEFYMDAwMDAwMCIKQ3JlYXRlZCA9ICIy
MDI0LTA2LTE1VDEyOjAwOjAwWiIKRXhwaXJlcyA9ICIyMDI0LTA2LTE2VDEy
OjAwOjAwWiIKUHJpbWFyeSA9IFRSVUUKUHVycG9zZSA9ICJEYWlseSBLZXkg
Zm9yIEg0WFJVTSB0cmFuc2FjdGlvbnMiCkJsb2NrSUQgPSAiJFtrZXlJZEAk
e2tleUlkfSIKUmV2b2NhdGlvbiA9IEZBTFNFClNpZ25hdHVyZSA9ICJHMkJY
WVhYMTIzNDU2Nzg5MEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMTIzNDU2
Nzg5MCIKCjxjb250YWN0QGg0eHJ1bXMub25pb24+CjEwNzQ4MjY5MzYKPGlk
OmA0eHJ1bXMub25pb24+CjxiNDM3MjY5MzYK= ${keyId}
-----END PGP PUBLIC KEY BLOCK-----`;
    
    document.getElementById('currentKey').textContent = key;
    return key;
}

function generateDropLocation() {
    const locations = [
        'https://github.com/torproject/tor/issues/',
        'https://www.reddit.com/r/onions/comments/',
        'https://gitlab.com/torproject/tor/-/issues/',
        'https://bitbucket.org/torproject/tor/issues/'
    ];
    
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const dropURL = randomLoc + randomNum;
    
    document.getElementById('dropPoint').innerHTML = `
        <strong>${dropURL}</strong><br>
        <small>Check every 30 minutes for replies</small>
    `;
    
    return dropURL;
}

function generatePGP() {
    const message = document.getElementById('pgpMessage').value;
    const verificationCode = 'THESHADOWPENTESTXX123';
    
    if (!message.trim()) {
        alert('Please enter a message first.');
        return;
    }
    
    // Simulate PGP encryption (in real use, would use OpenPGP.js)
    const encrypted = `-----BEGIN PGP MESSAGE-----
Version: H4XRUMS Encryptor 1.0

${btoa(`VERIFICATION: ${verificationCode}
TIMESTAMP: ${new Date().toISOString()}
MESSAGE:
${message}

YOUR SESSION: ${document.getElementById('sessionID').textContent}
POST TO: ${document.getElementById('dropPoint').innerText.split('<')[0]}
-----END ENCRYPTED DATA-----
`)}
-----END PGP MESSAGE-----`;
    
    document.getElementById('encryptedOutput').value = encrypted;
    
    // Auto-scroll to output
    document.getElementById('encryptedOutput').scrollIntoView({ behavior: 'smooth' });
}

// ==================== CURRENCY CONVERTER ====================
function calculateSC() {
    const egpInput = document.getElementById('egpInput');
    const scOutput = document.getElementById('scOutput');
    
    if (!egpInput.value || isNaN(egpInput.value) || egpInput.value <= 0) {
        scOutput.value = '0.00';
        return;
    }
    
    const egp = parseFloat(egpInput.value);
    const sc = (egp / 200).toFixed(2); // 1 SC = 200 EGP
    scOutput.value = sc;
}

// ==================== EVENT LISTENERS ====================
// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Handle ESC key for modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Initialize converter on page load
window.onload = function() {
    calculateSC();
    
    // Handle hash-based navigation
    if (window.location.hash) {
        const pageId = window.location.hash.substring(1);
        if (document.getElementById(pageId)) {
            showPage(pageId);
        }
    }
};

// ==================== UTILITY FUNCTIONS ====================
function simulateTyping(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Auto-refresh daily key every 24 hours
setInterval(generateDailyKey, 24 * 60 * 60 * 1000);
setInterval(generateDropLocation, 12 * 60 * 60 * 1000);

// Session timeout warning (1 hour)
setTimeout(() => {
    if (document.getElementById('securityAlert').style.display === 'none') {
        const warning = document.createElement('div');
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff9900;
            color: black;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            border: 2px solid #ff5500;
            max-width: 300px;
        `;
        warning.innerHTML = `
            <strong>⚠️ Session Expiring</strong>
            <p>Your secure session will expire in 15 minutes.</p>
            <button onclick="this.parentElement.remove()" style="background: black; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin-top: 10px;">
                Dismiss
            </button>
        `;
        document.body.appendChild(warning);
    }
}, 45 * 60 * 1000); // 45 minutes


// ==================== PASSWORD SYSTEM ====================
const TOOL_PASSWORDS = {
    'C7-V4': { name: 'CraxsRAT V7.4', price: '350 EGP', password: generatePassword() },
    'C-V3': { name: 'CyperRAT V3.4', price: '150 EGP', password: generatePassword() },
    'XW-SYS': { name: 'XwormRAT', price: '600 EGP', password: generatePassword() },
    'Q-R': { name: 'QuasarRAT', price: '80 EGP', password: generatePassword() },
    'G700-FW': { name: 'G700RAT', price: '500 EGP', password: generatePassword() },
    'ES-M': { name: 'EagleSPY', price: '400 EGP', password: generatePassword() },
    'BN-C': { name: 'Botnet Cluster', price: 'Varies', password: generatePassword() },
    'KL-S': { name: 'Keylogger Suite', price: '200 EGP', password: generatePassword() },
    'GR-S': { name: 'Grabber Suite', price: '180 EGP', password: generatePassword() },
    'T-S': { name: 'Trojan Suite', price: '220 EGP', password: generatePassword() },
    'SPY-S': { name: 'Spyware Suite', price: '300 EGP', password: generatePassword() }
};

const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1454588406746058904/yMsAQHXSTPUYL55_FLmNnyo2ctp6Fzzjm_J1piLWRKkXOeLgGsn-lU5z9TB4HvLwAxuc';

// Generate random password
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Send password to Discord
function sendToDiscord(toolCode, toolName, password) {
    const message = {
        content: `🔐 **PASSWORD UPDATE**\n${toolName} (${toolCode})\nNew Password: \`${password}\`\nGenerated: ${new Date().toISOString()}`,
        embeds: [{
            title: "🔑 Tool Password Changed",
            fields: [
                { name: "Tool", value: toolName, inline: true },
                { name: "Code", value: toolCode, inline: true },
                { name: "New Password", value: `\`\`\`${password}\`\`\`` },
                { name: "Price", value: TOOL_PASSWORDS[toolCode].price }
            ],
            timestamp: new Date().toISOString(),
            color: 0x00ffaa
        }]
    };

    fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    }).catch(console.error);
}

// Initialize passwords and send to Discord on first load
function initializePasswords() {
    Object.keys(TOOL_PASSWORDS).forEach(code => {
        const tool = TOOL_PASSWORDS[code];
        // Send initial password to Discord
        setTimeout(() => {
            sendToDiscord(code, tool.name, tool.password);
        }, 1000);
    });
    
    // Rotate passwords weekly
    setInterval(rotateAllPasswords, 7 * 24 * 60 * 60 * 1000);
}

// Rotate all passwords
function rotateAllPasswords() {
    Object.keys(TOOL_PASSWORDS).forEach(code => {
        const oldPassword = TOOL_PASSWORDS[code].password;
        TOOL_PASSWORDS[code].password = generatePassword();
        sendToDiscord(code, TOOL_PASSWORDS[code].name, TOOL_PASSWORDS[code].password);
        console.log(`Rotated password for ${code}: ${oldPassword} → ${TOOL_PASSWORDS[code].password}`);
    });
    alert('🔐 All tool passwords have been rotated! Check Discord.');
}

// Purchase function
function purchaseTool(toolCode) {
    const tool = TOOL_PASSWORDS[toolCode];
    if (!tool) return;
    
    const modalContent = `
        <h2>🔐 Purchase ${tool.name}</h2>
        <div class="password-info">
            <p><strong>Price:</strong> ${tool.price}</p>
            <p><strong>Current Password:</strong> <span class="blink">🔒 ENCRYPTED</span></p>
        </div>
        
        <h3>📋 Purchase Steps:</h3>
        <ol class="password-steps">
            <li>Contact us on Telegram or WhatsApp</li>
            <li>Send the keyword: <strong>SHADOWPENTESTERS</strong> (English) or <strong>مخترقون الظلال</strong> (Arabic)</li>
            <li>Wait for "APPROVED" response</li>
            <li>Send: Tool name, code (${toolCode}), and price</li>
            <li>We will reply with Instapay payment details</li>
            <li>Send payment proof</li>
            <li>Receive the password via secure message</li>
        </ol>
        
        <div class="contact-info">
            <h4>📞 Contact:</h4>
            <div class="contact-channels">
                <a href="https://t.me/sonicfazbear67" class="contact-channel" target="_blank">
                    <span>📱</span> Telegram: @sonicfazbear67
                </a>
                <a href="https://wa.me/201281792737" class="contact-channel" target="_blank">
                    <span>💬</span> WhatsApp: +201281792737
                </a>
            </div>
        </div>
        
        <div class="modal-actions">
            <button class="action-btn" onclick="copyToClipboard('${toolCode}')">
                📋 Copy Tool Code
            </button>
            <button class="action-btn" onclick="copyToClipboard('SHADOWPENTESTERS')">
                📋 Copy Keyword (EN)
            </button>
            <button class="action-btn" onclick="copyToClipboard('مخترقون الظلال')">
                📋 Copy Keyword (AR)
            </button>
        </div>
        
        <p class="note" style="margin-top: 20px; color: #ffaa00;">
            ⚠️ <strong>Important:</strong> Passwords rotate weekly. Contact immediately after purchase.
        </p>
    `;
    
    document.getElementById('purchaseModalContent').innerHTML = modalContent;
    showModal('purchaseModal');
}

// Update product cards to use purchase system
function loadProducts() {
    const grid = document.getElementById('toolsGrid');
    grid.innerHTML = '';
    
    Object.keys(TOOL_PASSWORDS).forEach(code => {
        const tool = TOOL_PASSWORDS[code];
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image" style="background: linear-gradient(45deg, #1a1a2e, #0f3460);">
                <span style="font-size: 3em;">${getToolIcon(code)}</span>
            </div>
            <h3 class="product-title">${tool.name}</h3>
            <div class="product-price">${tool.price}</div>
            <div class="product-code">Code: ${code}</div>
            <div class="password-status">
                <span class="status-indicator">●</span>
                Password: <span class="status-text">ACTIVE</span>
            </div>
            <button class="purchase-btn" onclick="purchaseTool('${code}')">
                🔐 Purchase Now
            </button>
            <p class="product-note">Contact with keyword to receive password</p>
        `;
        grid.appendChild(card);
    });
}

// Helper functions
function getToolIcon(code) {
    const icons = {
        'C7-V4': '🦠', 'C-V3': '🐍', 'XW-SYS': '🪱', 'Q-R': '☄️',
        'G700-FW': '🛡️', 'ES-M': '🦅', 'BN-C': '🤖', 'KL-S': '⌨️',
        'GR-S': '📥', 'T-S': '🐎', 'SPY-S': '👁️'
    };
    return icons[code] || '🛠️';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`Copied: ${text}`);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initializePasswords();
    loadProducts();
    
    // Add rotation button to admin area (if you keep admin panel)
    if (document.getElementById('rotatePasswordsBtn')) {
        document.getElementById('rotatePasswordsBtn').onclick = rotateAllPasswords;
    }
});

// Update footer with password rotation info
function updateFooter() {
    const nextRotation = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    document.getElementById('passwordRotation').textContent = 
        `Next rotation: ${nextRotation.toLocaleDateString()}`;
}
