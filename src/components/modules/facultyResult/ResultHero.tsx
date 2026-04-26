import { IResultClassDetails } from "@/@types/facultyClass";
import { BookOpen, Code2, Calendar, Users, Building2 } from "lucide-react";

export default function ResultHero({ classDetails }: { classDetails: IResultClassDetails }) {
    return (
        <div className="relative rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 py-12 md:py-16">
                <div className="max-w-6xl mx-auto">
                    {/* Header section */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <BookOpen className="w-6 h-6 text-blue-400" />
                            </div>
                            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Class Details</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{classDetails.courseName}</h1>
                        <p className="text-lg text-slate-300 flex items-center gap-2">
                            <Code2 className="w-5 h-5" />
                            Course Code: <span className="font-semibold text-white">{classDetails.courseCode}</span>
                        </p>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Semester card */}
                        <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                                    <Calendar className="w-5 h-5 text-amber-400" />
                                </div>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Semester</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{classDetails.semester}</p>
                        </div>

                        {/* Batch card */}
                        <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                                    <Users className="w-5 h-5 text-emerald-400" />
                                </div>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Batch</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{classDetails.batch}</p>
                        </div>

                        {/* Department card */}
                        <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 md:col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                                    <Building2 className="w-5 h-5 text-purple-400" />
                                </div>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Department</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{classDetails.department}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}