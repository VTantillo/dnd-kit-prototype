import clsx from 'clsx'
import BasicExample from './BasicExample'
import ComplexExample from './ComplexExample'

function Home() {
  return (
    <main className={clsx('Wrapper', 'flex flex-col gap-16 p-16')}>
      <h1 className={clsx('Heading', 'text-3xl font-bold')}>
        DND Kit Examples
      </h1>
      <div
        className={clsx(
          'BasicWrapper',
          'rounded-md border border-gray-400 p-16',
        )}
      >
        <h2 className={clsx('ExampleTitle', 'mb-4 text-xl font-semibold')}>
          Basic
        </h2>
        <BasicExample />
      </div>

      <div
        className={clsx(
          'ComplexWrapper',
          'rounded-md border border-gray-400 p-16',
        )}
      >
        <h2 className={clsx('ExampleTitle', 'mb-4 text-xl font-semibold')}>
          Multi zone example
        </h2>
        <ComplexExample />
      </div>
    </main>
  )
}

export default Home
