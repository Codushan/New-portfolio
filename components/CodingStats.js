"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const CodingStats = () => {
    // Hardcoded data for tabs as fallback/initial state
    const tabData = {
        "LeetCode": {
            total: { completed: 54, total: 100, percentage: 10 },
            easy: { completed: 19, total: 20 },
            medium: { completed: 30, total: 50 },
            hard: { completed: 5, total: 30 },
        },
        "GFG": {
            total: { completed: 20, total: 100, percentage: 20 },
            easy: { completed: 4, total: 20 },
            medium: { completed: 10, total: 50 },
            hard: { completed: 6, total: 30 },
        },
        "Coding Ninjas": {
            total: { completed: 22, total: 100, percentage: 27 },
            easy: { completed: 20, total: 20 },
            medium: { completed: 2, total: 50 },
            hard: { completed: 0, total: 30 },
        },
        "GitHub": {
            repos: 0,
            stars: 0,
            followers: 0,
            contributions: 0,
            languages: [],
        },
    };

    const [activeTab, setActiveTab] = useState("LeetCode");

    const [stats, setStats] = useState({
        github: {
            repos: 0,
            stars: 0,
            followers: 0,
            contributions: 0,
            languages: []
        },
        leetcode: {
            solved: 0,
            score: 0,
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            streak: 0,
            contestRating: 0
        },
        codingNinjas: {
            totalSolved: 0,
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            totalQuestions: 0,
            totalEasy: 0,
            totalMedium: 0,
            totalHard: 0,
        },
        gfg: {
            total_problems_solved: 0,
            total_score: 0,
            School: 0,
            Basic: 0,
            Easy: 0,
            Medium: 0,
            Hard: 0,
            pod_solved_longest_streak: 0
        }
    });

    const [actualStats, setActualStats] = useState(null);
    const [error, setError] = useState(null);
    const [animationReady, setAnimationReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showComponent, setShowComponent] = useState(false);
    const [hasCheckedCache, setHasCheckedCache] = useState(false);

    // Check cache
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const cachedData = localStorage.getItem('codingStatsData');
        const cachedTimestamp = localStorage.getItem('codingStatsTimestamp');

        if (cachedData && cachedTimestamp) {
            const timestamp = parseInt(cachedTimestamp);
            const now = Date.now();
            const cacheValidDuration = 60 * 60 * 1000; // 1 hour

            if (now - timestamp < cacheValidDuration) {
                try {
                    const parsedData = JSON.parse(cachedData);
                    setActualStats(parsedData);
                    setAnimationReady(true);
                    setIsLoading(false);
                    setHasCheckedCache(true);
                    setShowComponent(true);
                } catch (err) {
                    console.error('Error parsing cached data:', err);
                }
            }
        }

        setIsLoading(true);
        setHasCheckedCache(true);
    }, []);

    // Fetch data
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setError(null);

                const [codingNinjaResponse, githubResponse, leetcodeResponse, gfgResponse] = await Promise.all([
                    fetch('https://coding-ninja-api.vercel.app/api/test/Codushan'),
                    fetch('https://api.github.com/users/Codushan'),
                    fetch('https://leetcode-stats-api.herokuapp.com/Cbonleet'),
                    fetch(`https://gfg-scrapper.vercel.app/chandrabhushq6z0`)
                ]);

                const [codinNinjaData, githubData, leetcodeData, gfgData] = await Promise.all([
                    codingNinjaResponse.json(),
                    githubResponse.json(),
                    leetcodeResponse.json(),
                    gfgResponse.json()
                ]);

                if (leetcodeData.status === 'error') throw new Error(leetcodeData.message);

                const newStats = {
                    github: {
                        repos: githubData.public_repos || 0,
                        stars: 0,
                        followers: githubData.followers || 0,
                        contributions: 0,
                        languages: [
                            { name: 'JavaScript', percentage: 40 },
                            { name: 'Python', percentage: 30 },
                            { name: 'TypeScript', percentage: 20 },
                            { name: 'Others', percentage: 10 }
                        ]
                    },
                    leetcode: {
                        solved: leetcodeData.totalSolved || 0,
                        score: leetcodeData.contributionPoints || 0,
                        easySolved: leetcodeData.easySolved || 0,
                        mediumSolved: leetcodeData.mediumSolved || 0,
                        hardSolved: leetcodeData.hardSolved || 0,
                        streak: leetcodeData.streak || 0,
                        contestRating: leetcodeData.ranking || 0
                    },
                    codingNinjas: {
                        totalSolved: codinNinjaData.totalSolved || 0,
                        easySolved: codinNinjaData.easySolved || 0,
                        mediumSolved: codinNinjaData.mediumSolved || 0,
                        hardSolved: codinNinjaData.hardSolved || 0,
                        totalQuestions: codinNinjaData.totalQuestions || 0,
                        totalEasy: codinNinjaData.totalEasy || 0,
                        totalMedium: codinNinjaData.totalMedium || 0,
                        totalHard: codinNinjaData.totalHard || 0,
                    },
                    gfg: {
                        total_problems_solved: gfgData.total_problems_solved || 0,
                        total_score: gfgData.total_score || 0,
                        School: gfgData.School || 0,
                        Basic: gfgData.Basic || 0,
                        Easy: gfgData.Easy || 0,
                        Medium: gfgData.Medium || 0,
                        Hard: gfgData.Hard || 0,
                        pod_solved_longest_streak: gfgData.pod_solved_longest_streak || 0
                    }
                };

                if (typeof window !== 'undefined') {
                    localStorage.setItem('codingStatsData', JSON.stringify(newStats));
                    localStorage.setItem('codingStatsTimestamp', Date.now().toString());
                }

                setActualStats(newStats);
                setAnimationReady(true);
                setIsLoading(false);
                if (!showComponent) setShowComponent(true);

            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to fetch stats.');
                setIsLoading(false);
            }
        };

        if (isLoading && hasCheckedCache) {
            fetchStats();
        }
    }, [isLoading, hasCheckedCache, showComponent]);

    useEffect(() => {
        if (actualStats && animationReady) {
            setStats(actualStats);
        }
    }, [actualStats, animationReady]);

    const getDisplayData = () => {
        if (!stats) return tabData[activeTab];

        switch (activeTab) {
            case "LeetCode":
                return {
                    total: {
                        completed: stats.leetcode.solved,
                        total: 100, // Placeholder total
                        percentage: Math.round((stats.leetcode.solved / 2000) * 100), // Approx total
                    },
                    easy: { completed: stats.leetcode.easySolved, total: 500 },
                    medium: { completed: stats.leetcode.mediumSolved, total: 1000 },
                    hard: { completed: stats.leetcode.hardSolved, total: 500 },
                };
            case "GFG":
                return {
                    total: {
                        completed: stats.gfg.total_problems_solved,
                        total: 100,
                        percentage: Math.round((stats.gfg.total_problems_solved / 1000) * 100),
                    },
                    easy: { completed: stats.gfg.Easy, total: 300 },
                    medium: { completed: stats.gfg.Medium, total: 500 },
                    hard: { completed: stats.gfg.Hard, total: 200 },
                };
            case "Coding Ninjas":
                if (!stats.codingNinjas) return tabData["Coding Ninjas"];
                const cnTotalCompleted = stats.codingNinjas.totalSolved;
                const cnTotalQuestions = stats.codingNinjas.totalQuestions > 0 ? stats.codingNinjas.totalQuestions : 100;
                const cnTotalPercentage = cnTotalQuestions > 0 ? (cnTotalCompleted / cnTotalQuestions) * 100 : 0;

                return {
                    total: {
                        completed: cnTotalCompleted,
                        total: cnTotalQuestions,
                        percentage: Math.round(isNaN(cnTotalPercentage) ? 0 : cnTotalPercentage)
                    },
                    easy: { completed: stats.codingNinjas.easySolved, total: stats.codingNinjas.totalEasy || 100 },
                    medium: { completed: stats.codingNinjas.mediumSolved, total: stats.codingNinjas.totalMedium || 100 },
                    hard: { completed: stats.codingNinjas.hardSolved, total: stats.codingNinjas.totalHard || 100 },
                };
            case "GitHub":
                return stats.github;
            default:
                return tabData[activeTab];
        }
    };

    const displayData = getDisplayData();

    if (isLoading && !actualStats) return null;

    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Coding <span className="text-gradient">Stats</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-3xl overflow-hidden p-8"
                >
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-foreground/10 pb-4">
                        {Object.keys(tabData).map((tabName) => (
                            <button
                                key={tabName}
                                onClick={() => setActiveTab(tabName)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tabName
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                    : 'text-foreground/60 hover:text-primary hover:bg-primary/5'
                                    }`}
                            >
                                {tabName}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    {activeTab === "GitHub" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ProgressCard
                                title="Public Repos"
                                completed={displayData.repos}
                                percentage={0}
                                color="text-blue-500"
                                showRing={false}
                            />
                            <ProgressCard
                                title="Followers"
                                completed={displayData.followers}
                                percentage={0}
                                color="text-green-500"
                                showRing={false}
                            />
                            <ProgressCard
                                title="Total Stars"
                                completed={displayData.stars}
                                percentage={0}
                                color="text-yellow-500"
                                showRing={false}
                            />
                            <ProgressCard
                                title="Contributions"
                                completed={displayData.contributions}
                                percentage={0}
                                color="text-red-500"
                                showRing={false}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <ProgressCard
                                title="Total Progress"
                                completed={displayData.total.completed}
                                percentage={displayData.total.percentage}
                                color="text-blue-500"
                                showRing={false}
                            />
                            <ProgressCard
                                title="Easy"
                                completed={displayData.easy.completed}
                                percentage={0} // Not used for linear
                                color="text-green-500"
                                showRing={false}
                            />
                            <ProgressCard
                                title="Medium"
                                completed={displayData.medium.completed}
                                percentage={0}
                                color="text-yellow-500"
                                showRing={false}
                            />
                            <ProgressCard
                                title="Hard"
                                completed={displayData.hard.completed}
                                percentage={0}
                                color="text-red-500"
                                showRing={false}
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};



function ProgressCard({ title, completed, percentage, color, showRing }) {
    return (
        <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <h3 className="text-foreground/60 text-sm mb-4">{title}</h3>

            {showRing ? (
                <div className="relative w-32 h-32 flex items-center justify-center mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-foreground/10"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={351.86}
                            strokeDashoffset={351.86 - (351.86 * percentage) / 100}
                            className={color}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className={`text-3xl font-bold ${color}`}>{completed}</span>
                    </div>
                </div>
            ) : (
                <p className={`text-4xl font-bold ${color} mt-2`}>{completed}</p>
            )}
        </div>
    );
}

export default CodingStats;
