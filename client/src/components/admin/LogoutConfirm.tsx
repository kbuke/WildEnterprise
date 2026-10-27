// components/admin/LogoutConfirm.tsx
import type { UseMutationResult } from "@tanstack/react-query"

type Props = {
    logout: UseMutationResult<void, Error, void>
    onClose: () => void
}

export function LogoutConfirm({ logout, onClose }: Props) {
    return (
        <div className="bg-white text-coal p-6 rounded-lg flex flex-col gap-4">
            <p>Are you sure you want to log out?</p>
            <div className="flex gap-4">
                <button onClick={onClose}>Cancel</button>
                <button
                    disabled={logout.isPending}
                    onClick={() => logout.mutate(undefined, { onSuccess: onClose })}
                >
                    {logout.isPending ? "Logging out..." : "Log out"}
                </button>
            </div>
        </div>
    )
}