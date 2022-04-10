import Head from "next/head";
import Todos from "../components/todos";
import { Todo } from "../interfaces/api-dtos";
import { API_URL } from "../settings";

export default function Home({ todos }: { todos: Todo[] }) {
  return (
    <div className="container">
      <Head>
        <title>V-Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Todos</h1>
        <Todos todos={todos} />
      </main>

      <footer>
        V-Todo -&gt; check out{" "}
        <a href="https://github.com/ScuroGuardiano/v-todo" target="_blank">
          source code
        </a>
        <br />
        Created by{" "}
        <a href="https://github.com/ScuroGuardiano" target="_blank">
          Scuro Guardiano
        </a>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        main {
          flex: auto;
          max-width: 1000px;
          padding: 0.5rem;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }

        footer {
          padding: 0.5rem;
          text-align: center;
          border-top: solid 1px #eee;
        }
      `}</style>

      <style jsx global>{`
        html,
        body,
        #__next {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          height: 100vh;
        }

        body {
          background-color: #252535;
          color: #eee;
        }

        a {
          color: #54cdfc;
          cursor: pointer;
        }
        a:hover {
          color: #86dbfd;
        }

        .flex-break {
          flex-basis: 100%;
          height: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/todos`);
  const todos = (await res.json()) as Todo[];
  console.log(todos);
  return {
    props: {
      todos,
    },
  };
}
