export default function InfoCard({ title, text }) {
    return (
        <div className="card p-6 bg-white">
            <h3 className="font-semibold text-lg text-black mb-2">{title}</h3>
            <p className="body text-sm">{text}</p>
        </div>
    );
}
