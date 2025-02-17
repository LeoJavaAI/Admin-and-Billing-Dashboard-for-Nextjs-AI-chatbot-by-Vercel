import { UpdateAssistant, DeleteAssistant } from "./buttons"
import Link from 'next/link';


import { formatDateToLocal } from "@/lib/utils"

import { fetchFilteredAssistants } from "@/lib/db/queries"

export default async function AssistantsTable({
                                                query,
                                                currentPage,
                                              }: {
  query: string
  currentPage: number
}) {
  const assistants = await fetchFilteredAssistants(query, currentPage)

  return (

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {assistants?.map((assistant) => (
                  <div key={assistant.id} className="mb-2 w-full rounded-md bg-white p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">

                          <p>{assistant.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{assistant.modelName}</p>
                      </div>

                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p className="text-xl font-medium">{assistant.modelProvider}</p>

                      </div>

                      <div>
                        <p className="text-xl font-medium">{assistant.url}</p>

                      </div>




                      <div className="flex justify-end gap-2">
                        <UpdateAssistant id={assistant.id} />
                        <DeleteAssistant id={assistant.id} />
                      </div>
                    </div>
                  </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Assistant name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Model
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Provider
                </th>
                {/*<th scope="col" className="px-3 py-5 font-medium">*/}
                {/*  Created At*/}
                {/*</th>*/}
                <th scope="col" className="px-3 py-5 font-medium">
                  URL
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody className="bg-white">
              {assistants?.map((assistant) => (
                  <tr
                      key={assistant.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">

                        <p>{assistant.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">{assistant.modelName}</td>
                    <td className="whitespace-nowrap px-3 py-3">{assistant.modelProvider}</td>
                    <td className="whitespace-nowrap px-3 py-3">

                      <Link
                          href={assistant.url}
                          className="text-blue-600 hover:text-blue-800 hover:underline"

                          target="_blank"
                          rel="noopener noreferrer"
                      >
                       Link
                      </Link>

                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateAssistant id={assistant.id} />
                        <DeleteAssistant id={assistant.id} />
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

