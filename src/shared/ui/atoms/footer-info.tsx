type Props = {
  className?: string
}

export const FooterInfo = ({ className = '' }: Props) => {
  return (
    <div
      className={`px-4 py-10 border-t border-t-white border-opacity-10 text-sm leading-5 text-white ${className}`}
    >
      <div className="flex flex-col space-y-7 max-w-7xl w-full mx-auto">
        <span>© 2022, chiptaol.uz</span>
        <p>
          Сервис находится на стадии
          <br />
          открытого бета-тестирования
        </p>
      </div>
    </div>
  )
}
