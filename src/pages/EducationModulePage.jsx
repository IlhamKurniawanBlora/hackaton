import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowLeft, 
  Menu, 
  X, 
  Play,
  Bookmark,
  BookmarkCheck,
  Share2,
  Timer,
  TrendingUp,
  Star
} from 'lucide-react';

import { getModuleWithChapters } from '~/utils/modules';

const EducationModulePage = () => {
    const [module, setModule] = useState(null);
    const [moduleDetails, setModuleDetails] = useState([]);
    const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
    const [readingProgress, setReadingProgress] = useState({});
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [readingTime, setReadingTime] = useState(0);

    const { moduleId } = useParams();

    useEffect(() => {
        if (moduleId) {
            fetchModuleData();
        }
    }, [moduleId]);

    useEffect(() => {
        let interval;
        if (currentDetailIndex >= 0 && moduleDetails.length > 0) {
            interval = setInterval(() => {
                setReadingTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [currentDetailIndex, moduleDetails]);

    const fetchModuleData = async () => {
        setLoading(true);
        try {
            const moduleData = await getModuleWithChapters(moduleId);
            
            if (moduleData) {
                setModule(moduleData);
                setModuleDetails(moduleData.chapters || []);

                const initialProgress = {};
                if (moduleData.chapters) {
                    moduleData.chapters.forEach((detail, index) => {
                        initialProgress[detail.id] = index === 0;
                    });
                }
                setReadingProgress(initialProgress);
            }
        } catch (error) {
            console.error('Error fetching module data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDetailChange = (index) => {
        setCurrentDetailIndex(index);
        setSidebarOpen(false);

        const currentDetail = moduleDetails[index];
        if (currentDetail) {
            setReadingProgress(prev => ({
                ...prev,
                [currentDetail.id]: true
            }));
        }
    };

    const handleNextDetail = () => {
        if (currentDetailIndex < moduleDetails.length - 1) {
            handleDetailChange(currentDetailIndex + 1);
        }
    };

    const handlePrevDetail = () => {
        if (currentDetailIndex > 0) {
            handleDetailChange(currentDetailIndex - 1);
        }
    };

    const getCompletionPercentage = () => {
        if (moduleDetails.length === 0) return 0;
        const completedCount = Object.values(readingProgress).filter(Boolean).length;
        return Math.round((completedCount / moduleDetails.length) * 100);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentDetail = moduleDetails[currentDetailIndex];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading module...</p>
                </div>
            </div>
        );
    }

    if (!module || !moduleDetails.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center bg-white rounded-xl shadow-xl p-8 max-w-md">
                    <BookOpen className="w-16 h-16 text-red-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Module Not Found</h2>
                    <p className="text-gray-600 mb-4">The requested module could not be found.</p>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                        Browse Modules
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                                <ArrowLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Back</span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <Timer className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium">{formatTime(readingTime)}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-3">
                                <TrendingUp className="w-4 h-4 text-green-600" />
                                <div className="w-32 bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-gradient-to-r from-green-500 to-purple-600 h-2.5 rounded-full"
                                        style={{ width: `${getCompletionPercentage()}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-bold">{getCompletionPercentage()}%</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <button onClick={() => setIsBookmarked(!isBookmarked)} className="p-2 rounded-lg hover:bg-gray-100">
                                    {isBookmarked ? <BookmarkCheck className="w-5 h-5 text-green-600" /> : <Bookmark className="w-5 h-5 text-gray-500" />}
                                </button>
                                <button className="p-2 rounded-lg hover:bg-gray-100">
                                    <Share2 className="w-5 h-5 text-gray-500" />
                                </button>
                                <button 
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="lg:hidden p-2 rounded-lg bg-green-600 text-white"
                                >
                                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Sidebar */}
                    <div className={`lg:col-span-4 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden sticky top-24">
                            {/* Module Header */}
                            <div className="p-6">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">{module.level || 'Beginner'}</span>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium">{module.rating || '4.8'}</span>
                                    </div>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h1>
                                <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                                
                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-600">{module.duration || 'Self-paced'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-600">{module.students || 0} students</span>
                                    </div>
                                </div>

                                {/* Mobile Progress */}
                                <div className="md:hidden mb-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                        <span>Progress</span>
                                        <span className="font-bold">{getCompletionPercentage()}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-gradient-to-r from-green-500 to-purple-600 h-2.5 rounded-full"
                                            style={{ width: `${getCompletionPercentage()}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Content List */}
                            <div className="px-6 pb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Content</h3>
                                    <span className="text-sm text-gray-500">
                                        {Object.values(readingProgress).filter(Boolean).length} of {moduleDetails.length}
                                    </span>
                                </div>
                                
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {moduleDetails.map((detail, index) => (
                                        <button
                                            key={detail.id}
                                            onClick={() => handleDetailChange(index)}
                                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                                currentDetailIndex === index
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                    readingProgress[detail.id] 
                                                        ? 'bg-green-500 text-white' 
                                                        : currentDetailIndex === index
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                    {readingProgress[detail.id] ? (
                                                        <CheckCircle className="w-4 h-4" />
                                                    ) : (
                                                        <span className="text-xs">{index + 1}</span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{detail.title}</p>
                                                    <p className="text-xs text-gray-500">Chapter {index + 1}</p>
                                                </div>
                                                {currentDetailIndex === index && <Play className="w-4 h-4 text-green-600" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 mt-8 lg:mt-0">
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                            {/* Content Header */}
                            <div className="px-6 py-4 border-b bg-gradient-to-r from-green-50 to-indigo-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                            Chapter {currentDetailIndex + 1} of {moduleDetails.length}
                                        </span>
                                        <h2 className="text-xl font-bold text-gray-900 mt-2">{currentDetail?.title}</h2>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handlePrevDetail}
                                            disabled={currentDetailIndex === 0}
                                            className="p-2 rounded-lg bg-white shadow border hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={handleNextDetail}
                                            disabled={currentDetailIndex === moduleDetails.length - 1}
                                            className="p-2 rounded-lg bg-white shadow border hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-6">
                                <div 
                                    className="prose max-w-none prose-green prose-headings:text-gray-900 prose-p:text-gray-700"
                                    dangerouslySetInnerHTML={{ 
                                        __html: currentDetail?.content || '<p>No content available.</p>' 
                                    }}
                                />
                            </div>

                            {/* Navigation Footer */}
                            <div className="px-6 py-4 border-t bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={handlePrevDetail}
                                        disabled={currentDetailIndex === 0}
                                        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Previous</span>
                                    </button>
                                    
                                    <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                                        {currentDetailIndex + 1} / {moduleDetails.length}
                                    </div>
                                    
                                    {currentDetailIndex === moduleDetails.length - 1 ? (
                                        <button
                                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                                            onClick={() => window.location.href = `/quizzes/${moduleId}`}
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Start Test</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleNextDetail}
                                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                                        >
                                            <span>Next</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationModulePage;