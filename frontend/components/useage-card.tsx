// function usageCard() {
//   return (
//   {userData?.subscription?.plan &&
//                 userData?.subscription?.plan.name != "Professional" && (
//                   <div className="rounded-lg border bg-card p-4 shadow-sm">
//                     <h4 className="text-sm font-medium mb-3 flex items-center">
//                       <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
//                       {userData.subscription?.plan?.name || "Free"} Plan
//                     </h4>

//                     <div className="space-y-4">
//                       {/* Projects Usage */}
//                       <div className="space-y-2">
//                         <div className="flex justify-between items-center text-xs">
//                           <span className="text-muted-foreground">
//                             Projects
//                           </span>
//                           <span className="font-medium">
//                             {(userData.subscription?.plan?.projectLimit || 0) -
//                               (userData.remainingProjectLimit || 0)}
//                             /{userData.subscription?.plan?.projectLimit || 0}
//                           </span>
//                         </div>
//                         <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
//                             style={{
//                               width: `${
//                                 (((userData.subscription?.plan?.projectLimit ||
//                                   0) -
//                                   (userData.remainingProjectLimit || 0)) /
//                                   (userData.subscription?.plan?.projectLimit ||
//                                     1)) *
//                                 100
//                               }%`,
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       {/* Documents Usage */}
//                       <div className="space-y-2">
//                         <div className="flex justify-between items-center text-xs">
//                           <span className="text-muted-foreground">
//                             Documents
//                           </span>
//                           <span className="font-medium">
//                             {(userData.subscription?.plan?.documentLimit || 0) -
//                               (userData.remainingDocumentLimit || 0)}
//                             /{userData.subscription?.plan?.documentLimit || 0}
//                           </span>
//                         </div>
//                         <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-gradient-to-r from-violet-500 to-purple-400"
//                             style={{
//                               width: `${
//                                 (((userData.subscription?.plan?.documentLimit ||
//                                   0) -
//                                   (userData.remainingDocumentLimit || 0)) /
//                                   (userData.subscription?.plan?.documentLimit ||
//                                     1)) *
//                                 100
//                               }%`,
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       {/* Employee/Team Member Usage */}
//                       <div className="space-y-2">
//                         <div className="flex justify-between items-center text-xs">
//                           <span className="text-muted-foreground">
//                             Team Members
//                           </span>
//                           <span className="font-medium">
//                             {(userData.subscription?.plan?.employeeLimit || 0) -
//                               (userData.remainginEmployeeLimit || 0)}
//                             /{userData.subscription?.plan?.employeeLimit || 0}
//                           </span>
//                         </div>
//                         <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-gradient-to-r from-amber-500 to-orange-400"
//                             style={{
//                               width: `${
//                                 (((userData.subscription?.plan?.employeeLimit ||
//                                   0) -
//                                   (userData.remainginEmployeeLimit || 0)) /
//                                   (userData.subscription?.plan?.employeeLimit ||
//                                     1)) *
//                                 100
//                               }%`,
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-3 pt-3 border-t border-border">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="w-full text-xs h-7 text-muted-foreground hover:text-foreground"
//                         onClick={() =>
//                           router.push("/settings?tab=subscription")
//                         }
//                       >
//                         View Subscription
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//   );
// }




// export default usageCard;


// {
//   userData?.subscription ? (
//     <>
//       {/* Current Plan Card */}
//       <Card className="border-border/40 shadow-sm overflow-hidden">
//         <div className="bg-primary/5 px-6 py-4 border-b border-border/60">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div>
//               <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
//                 <CreditCard className="h-5 w-5" />
//                 {userData.subscription?.plan?.name || "Free"} Plan
//               </h3>
//               <p className="text-sm text-muted-foreground mt-1">
//                 {userData.subscription?.plan?.description ||
//                   "Subscription plan"}
//               </p>
//             </div>
//             <Badge
//               variant="outline"
//               className={`px-3 py-1 self-start ${
//                 userData.subscription.status === "active"
//                   ? "bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
//                   : userData.subscription.status === "canceled"
//                   ? "bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
//                   : userData.subscription.status === "pending"
//                   ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200"
//                   : "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
//               }`}
//             >
//               {userData.subscription.status === "active" ? (
//                 <Check className="h-3 w-3 mr-1" />
//               ) : userData.subscription.status === "canceled" ? (
//                 <X className="h-3 w-3 mr-1" />
//               ) : userData.subscription.status === "pending" ? (
//                 <Clock className="h-3 w-3 mr-1" />
//               ) : (
//                 <AlertCircle className="h-3 w-3 mr-1" />
//               )}
//               {userData.subscription.status || "Unknown"}
//             </Badge>
//           </div>
//         </div>

//         <CardContent className="p-6">
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Billing Details */}
//             <div className="space-y-4">
//               <h4 className="font-medium text-lg flex items-center gap-2">
//                 <FileText className="h-4 w-4 text-muted-foreground" />
//                 Billing Details
//               </h4>

//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between items-center py-2 border-b border-border/40">
//                   <span className="text-muted-foreground">Plan</span>
//                   <span className="font-medium">
//                     {userData.subscription?.plan?.name || "Free"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b border-border/40">
//                   <span className="text-muted-foreground">Billing Cycle</span>
//                   <span className="font-medium capitalize">
//                     {userData.subscription?.order?.billingInterval || "monthly"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b border-border/40">
//                   <span className="text-muted-foreground">Amount</span>
//                   <span className="font-medium">
//                     {userData.subscription?.order?.currency || "$"}{" "}
//                     {(
//                       (userData.subscription?.order?.amount || 0) / 100
//                     ).toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b border-border/40">
//                   <span className="text-muted-foreground">Payment ID</span>
//                   <span className="font-medium">
//                     {userData.subscription?.order?.paymentId || "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b border-border/40">
//                   <span className="text-muted-foreground">Start Date</span>
//                   <span className="font-medium">
//                     {userData.subscription?.order?.createdAt
//                       ? formatDate(userData.subscription.order.createdAt)
//                       : "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2">
//                   <span className="text-muted-foreground">Next Billing</span>
//                   <span className="font-medium">
//                     {userData.subscription?.order?.createdAt
//                       ? formatDate(
//                           new Date(
//                             new Date(
//                               userData.subscription.order.createdAt
//                             ).setFullYear(
//                               new Date(
//                                 userData.subscription.order.createdAt
//                               ).getFullYear() +
//                                 (userData.subscription.order.billingInterval ===
//                                 "yearly"
//                                   ? 1
//                                   : 0)
//                             )
//                           ).toISOString()
//                         )
//                       : "N/A"}
//                   </span>
//                 </div>
//               </div>

//               <div className="pt-4 flex gap-3">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="gap-1"
//                   onClick={() => {
//                     handleChangePlan();
//                   }}
//                 >
//                   <RefreshCw className="h-3.5 w-3.5" />
//                   Change Plan
//                 </Button>
//                 {userData.subscription.status === "active" &&
//                   userData.subscription.plan.name === "Professional" && (
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="gap-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
//                       onClick={handleCancelSubscription}
//                     >
//                       Cancel Subscription
//                     </Button>
//                   )}
//               </div>
//             </div>

//             {/* Plan Features */}
//             <div className="space-y-4">
//               <h4 className="font-medium text-lg flex items-center gap-2">
//                 <Check className="h-4 w-4 text-muted-foreground" />
//                 Plan Features
//               </h4>

//               <ul className="space-y-2.5">
//                 {userData.subscription?.plan?.features ? (
//                   userData.subscription.plan.features.map(
//                     (feature: string, index: number) => (
//                       <li key={index} className="flex items-start gap-2">
//                         <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <Check className="h-3 w-3 text-primary" />
//                         </div>
//                         <span className="text-sm">{feature}</span>
//                       </li>
//                     )
//                   )
//                 ) : (
//                   <li>No features available</li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Usage Limits Card */}
//       {userData.subscription.plan.name !== "Professional" && (
//         <Card className="border-border/40 shadow-sm">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-xl flex items-center gap-2">
//               <Shield className="h-5 w-5 text-muted-foreground" />
//               Usage Limits
//             </CardTitle>
//             <CardDescription>
//               Track your usage across projects, documents, and AI research
//               requests
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="p-6">
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//               {/* Projects */}
//               <div className="bg-card rounded-lg p-5 border">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h4 className="font-medium">Projects</h4>
//                     <p className="text-2xl font-bold mt-1">
//                       {(userData.subscription?.plan?.projectLimit || 0) -
//                         (userData.remainingProjectLimit || 0)}{" "}
//                       <span className="text-sm Warming: Cannot access 'remainingProjectLimit' on UserData type without checking for existence first text-muted-foreground font-normal">
//                         / {userData.subscription?.plan?.projectLimit || 0}
//                       </span>
//                     </p>
//                   </div>
//                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//                     <FileText className="h-5 w-5 text-primary" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="h-2 bg-muted rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-primary rounded-full"
//                       style={{
//                         width: `${
//                           (((userData.subscription?.plan?.projectLimit || 0) -
//                             (userData.remainingProjectLimit || 0)) /
//                             (userData.subscription?.plan?.projectLimit || 1)) *
//                           100
//                         }%`,
//                       }}
//                     ></div>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     {userData.remainingProjectLimit || 0} projects remaining
//                     this month
//                   </p>
//                 </div>
//               </div>

//               {/* Documents */}
//               <div className="bg-card rounded-lg p-5 border">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h4 className="font-medium">Documents</h4>
//                     <p className="text-2xl font-bold mt-1">
//                       {(userData.subscription?.plan?.documentLimit || 0) -
//                         (userData.remainingDocumentLimit || 0)}{" "}
//                       <span className="text-sm text-muted-foreground font-normal">
//                         / {userData.subscription?.plan?.documentLimit || 0}
//                       </span>
//                     </p>
//                   </div>
//                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//                     <FileText className="h-5 w-5 text-primary" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="h-2 bg-muted rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-primary rounded-full"
//                       style={{
//                         width: `${
//                           (((userData.subscription?.plan?.documentLimit || 0) -
//                             (userData.remainingDocumentLimit || 0)) /
//                             (userData.subscription?.plan?.documentLimit || 1)) *
//                           100
//                         }%`,
//                       }}
//                     ></div>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     {userData.remainingDocumentLimit || 0} documents remaining
//                     this month
//                   </p>
//                 </div>
//               </div>

//               {/* AI Research */}
//               <div className="bg-card rounded-lg p-5 border">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h4 className="font-medium">AI Research</h4>
//                     <p className="text-2xl font-bold mt-1">
//                       {(userData.subscription?.plan?.researchLimit || 0) -
//                         (userData.remainingResearchLimit || 0)}{" "}
//                       <span className="text-sm text-muted-foreground font-normal">
//                         / {userData.subscription?.plan?.researchLimit || 0}
//                       </span>
//                     </p>
//                   </div>
//                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//                     <FileText className="h-5 w-5 text-primary" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="h-2 bg-muted rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-primary rounded-full"
//                       style={{
//                         width: `${
//                           (((userData.subscription?.plan?.researchLimit || 0) -
//                             (userData.remainingResearchLimit || 0)) /
//                             (userData.subscription?.plan?.researchLimit || 1)) *
//                           100
//                         }%`,
//                       }}
//                     ></div>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     {userData.remainingResearchLimit || 0} AI research requests
//                     remaining today
//                   </p>
//                 </div>
//               </div>

//               {/* Team Members */}
//               <div className="bg-card rounded-lg p-5 border">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h4 className="font-medium">Team Members</h4>
//                     <p className="text-2xl font-bold mt-1">
//                       {(userData.subscription?.plan?.employeeLimit || 0) -
//                         (userData.remainginEmployeeLimit || 0)}
//                       <span className="text-sm text-muted-foreground font-normal">
//                         / {userData.subscription?.plan?.employeeLimit || 0}
//                       </span>
//                     </p>
//                   </div>
//                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//                     <Users className="h-5 w-5 text-primary" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="h-2 bg-muted rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-primary rounded-full"
//                       style={{
//                         width: `${
//                           (((userData.subscription?.plan?.employeeLimit || 0) -
//                             (userData.remainginEmployeeLimit || 0)) /
//                             (userData.subscription?.plan?.employeeLimit || 1)) *
//                           100
//                         }%`,
//                       }}
//                     ></div>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     {userData.remainingEmployeeLimit || 0} team members
//                     remaining
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </>
//   ) : (
//     <Card className="border-border/40 shadow-sm">
//       <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
//         <div className="rounded-full bg-primary/10 p-4 mb-4">
//           <CreditCard className="h-8 w-8 text-primary" />
//         </div>
//         <h3 className="text-2xl font-bold mb-2">No Active Subscription</h3>
//         <p className="text-muted-foreground max-w-md mb-8">
//           You don't have an active subscription. Subscribe to a plan to access
//           premium features and enhance your experience.
//         </p>
//         <div className="flex gap-3">
//           <Button size="lg" className="gap-2">
//             View Plans
//             <ArrowRight className="h-4 w-4" />
//           </Button>
//           <Button variant="outline" size="lg">
//             Contact Sales
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }