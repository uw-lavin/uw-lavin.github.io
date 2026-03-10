import CountUp from './CountUp';

export default function StatCard({ emoji, to, label, valuePrefix = '', valueSuffix = '' }) {
    return (
        <div className="card text-center p-6 bg-white">
            <div className="text-4xl mb-2">{emoji}</div>
            <div className="text-3xl font-black text-black mb-2">
                {valuePrefix}
                <CountUp from={0} to={to} separator="," direction="up" duration={1} className="count-up-text" />
                {valueSuffix}
            </div>
            <div className="body font-semibold">{label}</div>
        </div>
    );
}
