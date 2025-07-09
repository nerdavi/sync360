const { useState, useEffect, useCallback } = React;

// IMPORTANTE: Altere esta URL para a do seu backend
const API_URL = window.location.hostname === "localhost"
  ? "http://localhost/sync360/backend/"
  : "http://localhost/sync360/backend/"; // 

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  const [temaEscuro, setTemaEscuro] = useState(() => {
    if (localStorage.getItem('tema')) {
      return localStorage.getItem('tema') === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (temaEscuro) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tema', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tema', 'light');
    }
  }, [temaEscuro]);

  const alternarTema = () => setTemaEscuro(!temaEscuro);

  const carregarUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}listar_usuarios.php`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (err) {
      setError("Falha ao carregar usuários. Verifique se o backend está rodando e a URL da API está correta.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { carregarUsuarios(); }, [carregarUsuarios]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = usuarios.filter(usuario =>
      usuario.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
      usuario.estado.toLowerCase().includes(lowerCaseSearchTerm) ||
      (usuario.bio && usuario.bio.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (usuario.rua && usuario.rua.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (usuario.bairro && usuario.bairro.toLowerCase().includes(lowerCaseSearchTerm))
    );
    setFilteredUsuarios(filtered);
  }, [usuarios, searchTerm]);

  const abrirModal = (usuario) => {
    const usuarioParaForm = usuario || { nome: '', idade: '', rua: '', bairro: '', estado: '', bio: '', imagem: '' };
    setForm(usuarioParaForm);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTimeout(() => setForm(null), 300);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}post_usuario.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (result.status !== "ok") throw new Error(result.message || "Ocorreu um erro ao salvar.");
      alert(result.message);
      fecharModal();
      carregarUsuarios();
    } catch (err) {
      alert(`Erro ao salvar: ${err.message}`);
    }
  };

  const handleDelete = async (usuarioId) => {
    if (window.confirm("Você tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.")) {
      try {
        const res = await fetch(`${API_URL}deletar_usuario.php`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: usuarioId })
        });
        const result = await res.json();
        if (result.status !== "ok") throw new Error(result.message || "Ocorreu um erro ao deletar.");
        alert(result.message);
        fecharModal();
        carregarUsuarios();
      } catch (err) {
        alert(`Erro ao deletar: ${err.message}`);
      }
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prevSelectedUsers => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter(id => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) {
      alert("Nenhum usuário selecionado para deletar.");
      return;
    }

    if (window.confirm(`Você tem certeza que deseja deletar ${selectedUsers.length} usuário(s) selecionado(s)? Esta ação não pode ser desfeita.`)) {
      try {
        const res = await fetch(`${API_URL}deletar_multiplos_usuarios.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedUsers })
        });
        const result = await res.json();
        if (result.status !== "ok") throw new Error(result.message || "Ocorreu um erro ao deletar os usuários selecionados.");
        alert(result.message);
        setSelectedUsers([]);
        carregarUsuarios();
      } catch (err) {
        alert(`Erro ao deletar usuários selecionados: ${err.message}`);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const IconeSol = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
  const IconeLua = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
  const IconeLupa = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

  if (loading) return <p className="text-center text-xl text-gray-800 dark:text-gray-200">Carregando usuários...</p>;
  if (error) return <p className="text-center text-xl text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full transition-colors duration-300">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">Usuários</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {selectedUsers.length > 0 && (
            <button onClick={handleDeleteSelected} className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 w-full sm:w-auto">
              Deletar ({selectedUsers.length})
            </button>
          )}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Pesquisar usuários..."
              // Aumentado o padding-left para dar espaço à lupa e ao texto
              className="input pl-10 pr-4 w-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button onClick={() => abrirModal(null)} className="btn-primary hidden sm:block">+ Novo Usuário</button>
          <button onClick={alternarTema} className="btn-secondary">{temaEscuro ? <IconeSol /> : <IconeLua />}</button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsuarios.length > 0 ? (
          filteredUsuarios.map(u => (
            <div
              key={u.id}
              className={`card relative ${selectedUsers.includes(u.id) ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <input
                type="checkbox"
                className="absolute top-3 left-3 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer z-10"
                checked={selectedUsers.includes(u.id)}
                onChange={() => handleSelectUser(u.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <div onClick={() => abrirModal(u)} className="flex flex-col items-center w-full p-4 pt-8" title="Clique para editar">
                <img src={u.imagem || `https://i.pravatar.cc/150?u=${u.id}`} alt={`Foto de ${u.nome}`} className="card-image" />
                <h2 className="card-title">{u.nome}</h2><p className="card-subtitle">{u.estado}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">Nenhum usuário encontrado com o termo de pesquisa.</p>
        )}
      </div>
      
      <button onClick={() => abrirModal(null)} className="btn-primary sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-3xl">+</button>

      {modalAberto && (
        <div className="modal-bg">
          <form onSubmit={salvar} className="modal-content">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">{form.id ? 'Editar Perfil' : 'Criar Novo Usuário'}</h2>
            <button type="button" onClick={fecharModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="space-y-4">
              <img src={form.imagem || `https://i.pravatar.cc/150?u=new`} alt="Preview" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-gray-300 dark:border-gray-600" />
              <input className="input" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" required />
              <div className="flex gap-4"><input className="input" name="idade" type="number" value={form.idade} onChange={handleChange} placeholder="Idade" /><input className="input" name="estado" value={form.estado} onChange={handleChange} placeholder="Estado (UF)" required maxLength="2" /></div>
              <div className="flex gap-4"><input className="input" name="rua" value={form.rua} onChange={handleChange} placeholder="Rua" /><input className="input" name="bairro" value={form.bairro} onChange={handleChange} placeholder="Bairro" /></div>
              <textarea className="input h-24" name="bio" value={form.bio} onChange={handleChange} placeholder="Uma breve biografia..."></textarea>
              <input className="input" name="imagem" value={form.imagem} onChange={handleChange} placeholder="URL da imagem de perfil" />
              
              <div className="flex items-center gap-4 pt-4">
                {form.id && (
                  <button type="button" onClick={() => handleDelete(form.id)} className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500">Deletar</button>
                )}
                <button type="submit" className="w-full btn-primary !py-3 !text-lg">Salvar</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
