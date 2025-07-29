import { openDb } from '@/lib/db';

export async function GET() {
  const db = await openDb();
  const clientes = await db.all('SELECT * FROM clientes');
  return Response.json(clientes);
}

export async function POST(request: Request) {
  try {
    const { nome, telefone, email, etapa } = await request.json();
    const db = await openDb();
    const result = await db.run(
      'INSERT INTO clientes (nome, telefone, email, etapa) VALUES (?, ?, ?, ?)',
      [nome, telefone, email, etapa]
    );
    const cliente = await db.get('SELECT * FROM clientes WHERE id = ?', [
      result.lastID,
    ]);

    return Response.json(cliente, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    return Response.json(
      { error: 'Erro ao cadastrar cliente' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try{
    const {id, nome , telefone , email , etapa} = await request.json();
    const db = await openDb();
    const result = await db.run(
      'UPDATE clientes SET nome = ?, telefone = ?, email = ?, etapa = ? WHERE id = ?',
      [nome, telefone, email, etapa, id])
    if (result.changes === 0) {
      return Response.json(
        { error: 'Cliente não encontrado' },
        { status: 404 }
      );
    }
    const cliente = await db.get('SELECT * FROM clientes WHERE id = ?', [id]);
    return Response.json(cliente, { status: 200 });
  }catch(e){
    console.log("Erro ao atualizar cliente:", e);
    return Response.json(
      { error: 'Erro ao atualizar cliente' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const db = await openDb();
  await db.run('DELETE FROM clientes WHERE id = ?', [id]);
  return Response.json({ mensagem: 'Cliente removido com sucesso' });
}
