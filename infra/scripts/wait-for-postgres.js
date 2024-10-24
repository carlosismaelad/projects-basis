const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      // console.log("❌ Postgres não está aceitando conexões ainda.");
      checkPostgres();
      return;
    }
    console.log("\n\n🟢 Postgres está pronto e aceitando conexões\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando Postgres aceitar conexões...");

checkPostgres();
