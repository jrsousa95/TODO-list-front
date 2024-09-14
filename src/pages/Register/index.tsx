export function Register() {
  return (
    <>
      <h1>Cadastro</h1>

      <form>
        <div>
          <label>Nome</label>
          <input type="text" name="name" required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Senha</label>
          <input type="password" name="password" required />
        </div>

        <div>
          <label>Confirmar senha</label>
          <input type="password" name="confirmPassword" required />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
