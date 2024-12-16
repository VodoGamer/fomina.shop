"""update order

Revision ID: 909518ec4681
Revises: 37f41805de3a
Create Date: 2024-08-29 23:29:38.551283

"""

from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "909518ec4681"
down_revision: Union[str, None] = "37f41805de3a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("order", sa.Column("delivery_method", sa.String(length=255), server_default=""))
    op.add_column("order", sa.Column("city", sa.String(length=255), server_default=""))

    op.alter_column(
        "order",
        "delivery_method",
        existing_type=sa.String(length=255),
        nullable=False,
        server_default=None,
    )
    op.alter_column(
        "order", "city", existing_type=sa.String(length=255), nullable=False, server_default=None
    )


def downgrade() -> None:
    op.drop_column("order", "city")
    op.drop_column("order", "delivery_method")
