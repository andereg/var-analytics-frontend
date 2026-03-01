import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";


const PIE_COLORS = ["#3F51B5", "#FF2E7E"];

export function ClubPieChart({ club }: { club: any }) {
    const forCount = club?.forControversies?.length ?? 0;
    const againstCount = club?.againstControversies?.length ?? 0;

    const data = [
        { name: "For", value: forCount },
        { name: "Against", value: againstCount },
    ];

    const total = forCount + againstCount;

    return (
        <div className="w-48 h-48 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        label={false}
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={PIE_COLORS[index]}/>
                        ))}
                    </Pie>


                    {/*<Tooltip
                        formatter={(value: number) => {
                            const pct = total ? Math.round((value / total) * 100) : 0;
                            return [`${value} (${pct}%)`, "Count"];
                        }}
                    />

                    <Legend />
                    */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
    }