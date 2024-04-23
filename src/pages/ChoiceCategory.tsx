const CATEGORY: CategoryItem[] = [
    { icone: '🌿', name: '힐링' },
    { icone: '🍁', name: '단풍' },
    { icone: '👊🏻', name: '정상등반' },
    { icone: '🎒', name: '백패킹' },
    { icone: '📸', name: '출사' },
    { icone: '🍽️', name: '식도락' },
    { icone: '🌍', name: '플로깅' },
];

interface CategoryItem {
    icone: string;
    name: string;
}

export default function ChoiceCategoty() {
    return (
        <>
            <div>
                <h2>엘리스님, 환영해요!</h2>
                <p>시작에 앞서 선호하시는 카테고리를 선택해주세요.</p>
            </div>
            <div>
                <h3>목적</h3>
                <div>
                    {CATEGORY.map((item) => (
                        <div key={item.name}>
                            <p>{item.icone}</p>
                            <p>#{item.name}</p>
                        </div>
                    ))}
                </div>
                <h3>운동 능력</h3>
                <div>
                    <div>
                        <p>🌱</p>
                        <p>#비기너</p>
                    </div>
                    <div>
                        <p>🪴</p>
                        <p>#아마추어</p>
                    </div>
                    <div>
                        <p>🌳</p>
                        <p>#프로</p>
                    </div>
                </div>
                <div>이제 시작 해 볼까요?</div>
            </div>
        </>
    );
}
