import { KeywordItemType } from '../model/keywordItem'

interface KeywordItemProps {
  keyword: KeywordItemType
  onClick: (keyword: KeywordItemType) => void
}

export function KeywordItem({ keyword, onClick }: KeywordItemProps) {
  return (
    <div
      key={keyword.id}
      className="pt-2"
    >
      <p
        className="text-md ml-4 font-semibold"
        onClick={() => onClick(keyword)}
      >
        {keyword.keywordName}
      </p>
    </div>
  )
}
