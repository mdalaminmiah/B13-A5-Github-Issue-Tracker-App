const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const SEARCH_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";
let allIssues = [];

async function fetchIssues() {
    const container = document.getElementById('issue-container');
    container.innerHTML = `<div class="col-span-full text-center py-20 text-gray-400 font-bold animate-pulse">CONNECTING...</div>`;
    
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        allIssues = result.data || [];
        renderIssues(allIssues);
    } catch (error) {
        container.innerHTML = `<div class="col-span-full text-center py-20 text-red-500 font-bold">Failed to load.</div>`;
    }
}

function renderIssues(issues) {
    const container = document.getElementById('issue-container');
    document.getElementById('issue-count').innerText = `${issues.length} Issues`;
    container.innerHTML = "";

    issues.forEach(issue => {
        const isClosed = issue.status.toLowerCase() === 'closed';
        const borderColor = isClosed ? 'border-closed-purple' : 'border-open-green';

        const card = document.createElement('div');
        card.className = `bg-white rounded-xl shadow-sm border-t-4 ${borderColor} p-6 flex flex-col justify-between hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer`;
        card.onclick = () => showDetails(issue.id || issue._id);

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[10px] font-black uppercase px-2 py-1 rounded bg-gray-100 text-gray-500 tracking-tighter">${issue.priority}</span>
                    <div class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full ${isClosed ? 'bg-closed-purple' : 'bg-open-green'}"></span>
                        <span class="text-[10px] font-bold text-gray-400 uppercase">${issue.status}</span>
                    </div>
                </div>
                <h3 class="font-bold text-gray-800 text-lg leading-tight mb-2">${issue.title}</h3>
                <p class="text-sm text-gray-400 line-clamp-3 mb-6">${issue.description}</p>
            </div>
            <div class="space-y-4 pt-4 border-t">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-brand-purple/10 flex items-center justify-center text-[10px] font-bold text-brand-purple">
                            ${issue.author ? issue.author.charAt(0) : 'U'}
                        </div>
                        <span class="text-xs text-gray-700 font-bold">@${issue.author ? issue.author.split(' ')[0].toLowerCase() : 'user'}</span>
                    </div>
                    <span class="text-[10px] text-gray-300 font-bold">${new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

async function showDetails(id) {
    const modal = document.getElementById('issue_modal');
    modal.showModal(); // DaisyUI Method

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const result = await res.json();
        const issue = result.data;

        document.getElementById('modal-header').innerHTML = `
            <h2 class="text-2xl font-black text-slate-800 mb-2">${issue.title}</h2>
            <div class="flex items-center gap-2 text-[10px] font-bold">
                <span class="bg-green-500 text-white px-3 py-0.5 rounded-full uppercase">${issue.status}</span>
                <span class="text-slate-400">• By ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>`;

        document.getElementById('modal-tags').innerHTML = `
            <span class="border border-red-100 text-red-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">🪲 BUG</span>
            <span class="border border-orange-100 text-orange-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">💡 HELP WANTED</span>`;

        document.getElementById('modal-desc').innerText = issue.description;
        document.getElementById('modal-author').innerText = issue.author;
        
        const pBadge = document.getElementById('modal-priority');
        pBadge.innerText = issue.priority;
        pBadge.className = issue.priority.toLowerCase() === 'high' 
            ? "bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase" 
            : "bg-orange-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase";

    } catch (e) { console.error(e); }
}

function filterIssues(status) {
    document.querySelectorAll('[onclick^="filterIssues"]').forEach(btn => {
        btn.classList.remove('active-tab');
        btn.classList.add('text-gray-600');
    });
    document.getElementById(`tab-${status}`).classList.add('active-tab');
    renderIssues(status === 'all' ? allIssues : allIssues.filter(i => i.status.toLowerCase() === status));
}

async function handleSearch() {
    const query = document.getElementById('search-input').value;
    if (!query) return renderIssues(allIssues);
    const res = await fetch(`${SEARCH_URL}${query}`);
    const result = await res.json();
    renderIssues(result.data || []);
}

fetchIssues();