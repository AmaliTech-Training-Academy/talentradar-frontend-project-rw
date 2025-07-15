// "use client"

// import type React from "react"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// interface TeamHeaderTabsProps {
//   totalMembers: number
//   showAll: boolean
//   onViewAllClick: () => void
//   children: React.ReactNode
//   onShowLessClick: () => void
// }

// export function TeamHeaderTabs({
//   totalMembers,
//   showAll,
//   onViewAllClick,
//   children,
//   onShowLessClick,
// }: TeamHeaderTabsProps) {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">AI Scores - Team Overview</h1>
//         {!showAll && totalMembers > 4 && (
//           <Button
//             onClick={onViewAllClick}
//             variant="outline"
//             className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
//           >
//             View All ({totalMembers})
//           </Button>
//         )}
        
//         <div>
          
//         </div>
//       </div>

//       <Tabs defaultValue="overview" className="w-full">
//         <TabsList className="grid w-full grid-cols-5 mb-6">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           <TabsTrigger value="performance">Performance</TabsTrigger>
//           <TabsTrigger value="insights">Insights</TabsTrigger>
//           <TabsTrigger value="reports">Reports</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-6">
//           {children}
//           {showAll && (
//             <div className="flex justify-center mt-6">
//               <Button onClick={onShowLessClick} variant="outline">
//                 Show Less
//               </Button>
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="analytics" className="space-y-6">
//           <div className="text-center py-12">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
//             <p className="text-gray-500">Detailed analytics and metrics coming soon...</p>
//           </div>
//         </TabsContent>

//         <TabsContent value="performance" className="space-y-6">
//           <div className="text-center py-12">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Tracking</h3>
//             <p className="text-gray-500">Performance trends and historical data coming soon...</p>
//           </div>
//         </TabsContent>

//         <TabsContent value="insights" className="space-y-6">
//           <div className="text-center py-12">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insights</h3>
//             <p className="text-gray-500">AI-powered insights and recommendations coming soon...</p>
//           </div>
//         </TabsContent>

//         <TabsContent value="reports" className="space-y-6">
//           <div className="text-center py-12">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports</h3>
//             <p className="text-gray-500">Detailed reports and exports coming soon...</p>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
